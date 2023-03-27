<script lang="ts">
	import socket from 'socket.io-client';

	import logo_yeti from '$lib/assets/images/logo-yeti.png';
	import logo_marmite from '$lib/assets/images/logo-marmite.png';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import WalletController from 'lamden_wallet_controller';
	import { connection_requst } from '$lib/ts/wallet.config';
	import axios from 'axios';
	import { createBlockExplorerLink, getNumberValue } from '../ts/utils';
	import { ToastService } from '../services/toast.service';

	let lwc: WalletController;
	let check_wallet_installed_interval: NodeJS.Timer;

	let wallet_installed = false;
	let wallet_connected = false;
	let wallet_locked = true;
	let approved_amount = 0;
	$: approved_amount;
	let connection;
	let converting = false;
	let approving = false;

	// wallet info
	let vk = '';
	let marmite_balance: number;
	let yeti_balance: number;
	let marmite_burn_value: number;
	// let xptl_receive_value: number;
	$: yeti_receive_value = parseBalanceValue(String(marmite_burn_value || 0));

	onMount(() => {
		if (browser) {
			initWallet();
			initWsConnection();
		}
	});

	async function getApprovalBalance(vk: string) {
		try {
			const res = await axios.get(
				`https://rocketswap.exchange/api/proxy_req?action_name=get_balance_value&args=con_marmite100_contract&args=${vk}:con_yeti`
			);
			if (!res.data) return 0;
			return getNumberValue(res.data);
		} catch (err) {
			console.log({ err });
			return 0;
		}
	}

	function initWsConnection() {
		connection = socket.connect('https://rocketswap.exchange/');
		connection.on('connect', () => {
			console.log('connected');
		});
	}

	function handleWalletInfo(e) {
		console.log({ handleWalletInfo: e });
		const network_approved = e.approvals?.[connection_requst['networkName']];
		const network_type_approved =
			e.approvals?.[connection_requst['networkName']][connection_requst['networkType']];
		if (network_approved && network_type_approved) {
			wallet_connected = true;
		}
		if (e.setup && !e.locked) {
			wallet_locked = false;
		}
		if (e.locked) {
			wallet_locked = true;
		}
		if (e.wallets && e.wallets[0]) {
			vk = e.wallets[0];
			handleWalletVk(vk);
		}
		if (e.errors && e.errors[0] === 'Lamden Vault is Locked') wallet_locked = true;
		if (
			e.errors &&
			e.errors[0] ===
				"You must be an authorized dApp to send this message type. Send 'lamdenWalletConnect' event first to authorize."
		)
			wallet_connected = false;
	}

	async function handleWalletVk(vk: string) {
		console.log('handleWalletVk', vk);
		connection.emit('join_room', `balance_feed:${vk}`);
		// joinRoom(`balance_feed:${vk}`);

		connection.on(`balance_update:${vk}`, (balance_update) => {
			const { payload } = balance_update;
			const { balances } = payload;

			marmite_balance = parseBalanceValue(balances['con_marmite100_contract']);
			yeti_balance = parseBalanceValue(balances['con_yeti']);
		});

		connection.on(`balance_list:${vk}`, (balance_list) => {
			console.log({ balance_list });
			const { balances } = balance_list;
			marmite_balance = parseBalanceValue(balances['con_marmite100_contract']);
			yeti_balance = parseBalanceValue(balances['con_yeti']);
		});

		approved_amount = await getApprovalBalance(vk);
	}

	function parseBalanceValue(balance: string | undefined) {
		if (balance === undefined) return 0;
		return Number(Number(balance).toFixed(2));
	}

	function handleWalletInstalled(e) {
		wallet_installed = e;
	}

	function handleConnectClicked() {
		lwc.sendConnection(connection_requst);
	}

	function checkForIntstalledWallet() {
		console.log('checkForIntstalledWalled');
		lwc.walletIsInstalled().then((res) => {
			clearInterval(check_wallet_installed_interval);
			handleWalletInstalled(res);
		});
	}

	function initWallet() {
		lwc = new WalletController();

		lwc.events.on('newInfo', handleWalletInfo);
		lwc.events.on('installed', handleWalletInstalled);

		checkForIntstalledWallet();
		check_wallet_installed_interval = setInterval(checkForIntstalledWallet, 1500);
	}

	function burnMax() {
		marmite_burn_value = marmite_balance;
	}

	/**
	 * Name	Type	Description	
		tx	Object	A connection request object	 
		tx.networkType	string	Which Lamden network the tx is for (Mainnet or testnet)	 
		tx.networkName	string	Name of a Lamden Network, leave blank for legacy Lamden, use "arko" for the new Lamden Network	Optional
		tx.stampLimit	string	The max Stamps this tx is allowed to use. Cannot be more but can be less.	 
		tx.methodName	string	The method on your approved smart contract to call	 
		tx.kwargs	Object	A keyword object to supply arguments to your method	 
		callback	Function	A function that will called and passed the tx results.	Optional
	*/
	const base_tx = {
		networkType: 'mainnet',
		networkName: 'arko',
		stampLimit: 100
	};

	function handleApproveClicked() {
		const approve_amount = String(marmite_burn_value - approved_amount);
		const approve_tx = {
			...base_tx,
			methodName: 'approve',
			contractName: 'con_marmite100_contract',
			kwargs: {
				to: 'con_yeti',
				amount: { __fixed__: approve_amount }
			}
		};
		approving = true;
		ToastService.getInstance().addToast({
			heading: 'Approval transaction sent.',
			type: 'info'
		});
		lwc.sendTransaction(approve_tx, async (res) => {
			if (res.status === 'error')
				ToastService.getInstance().addToast({
					heading: 'Approval transcation failed :(',
					type: 'error',
					link: {
						text: 'View on TAUHQ',
						href: createBlockExplorerLink('transactions', res.data.txHash)
					}
				});
			if (res.status === 'success')
				ToastService.getInstance().addToast({
					heading: `Successfully approved ${approve_amount} $MARMITE.`,
					type: 'success',
					link: {
						text: 'View on TAUHQ',
						href: createBlockExplorerLink('transactions', res.data.txHash)
					}
				});
			approved_amount = await getApprovalBalance(vk);
			console.log({ approved_amount });
			approving = false;
		});
	}

	function resetBurnAmount() {
		marmite_burn_value = 0;
	}

	function handleBurnClicked() {
		const burn_tx = {
			...base_tx,
			methodName: 'swap_token',
			contractName: 'con_yeti',
			kwargs: {
				amount: { __fixed__: String(Number(marmite_burn_value)) }
			}
		};

		converting = true;
		lwc.sendTransaction(burn_tx, async (res) => {
			if (res.status === 'error')
				ToastService.getInstance().addToast({
					heading: 'Mint transcation failed :(',
					link: {
						text: 'View on TAUHQ',
						href: createBlockExplorerLink('transactions', res.data.txHash),
						link: {
							text: 'View on TAUHQ',
							href: createBlockExplorerLink('transactions', res.data.txHash)
						}
					},
					type: 'error'
				});
			if (res.status === 'success')
				ToastService.getInstance().addToast({
					heading: `Successfully converted ${marmite_burn_value} $MARMITE to ${marmite_burn_value} $YETI !`,
					type: 'success',
					link: {
						text: 'View on TAUHQ',
						href: createBlockExplorerLink('transactions', res.data.txHash)
					}
				});
			approved_amount = await getApprovalBalance(vk);
			resetBurnAmount();
			converting = false;
		});
	}
</script>

<div class="convert-cont">
	<div class="action-heading">Burn</div>
	<div class="balance">
		{#if wallet_connected && !wallet_locked}
			<span><a on:click|preventDefault={burnMax} href="#mint">balance : {marmite_balance}</a></span>
		{/if}
	</div>
	<div class="input-cont">
		<div class="token-meta-cont">
			<div class="token-logo-cont">
				<img src={logo_marmite} alt="" />
			</div>
			<div class="token-details-cont">
				<div class="token-name">Marmite</div>
				<div class="token-symbol">$MARMITE</div>
			</div>
			<div class="input-container">
				<input type="number" bind:value={marmite_burn_value} placeholder="0" />
			</div>
			<!-- <div class="max-btn-cont">
				{#if wallet_connected && !wallet_locked}
					<button on:click={burnMax} class="btn-small btn-rounded button btn-secondary ml-5"
						>max</button
					>
				{/if}
			</div> -->
		</div>
	</div>
	<div class="action-heading mt-10">Receive</div>
	<div class="balance">
		{#if wallet_connected && !wallet_locked}
			<span> balance : {yeti_balance} </span>
		{/if}
	</div>
	<div class="input-cont">
		<div class="token-meta-cont">
			<div class="token-logo-cont">
				<img src={logo_yeti} alt="" />
			</div>
			<div class="token-details-cont">
				<div class="token-name">YETI Token</div>
				<div class="token-symbol">$YETI</div>
			</div>
			<div class="input-container">
				<input
					style="pointer-events:none; user-select:none;"
					bind:value={yeti_receive_value}
					type="number"
					placeholder="0.00"
				/>
			</div>
			<!-- <div class="max-btn-cont" /> -->
		</div>
	</div>
	<div class="button-cont">
		{#if !wallet_installed}
			<button disabled class="button btn-primary btn-rounded btn-wide btn-outline"
				>install wallet</button
			>
			<div class="explanation">
				Please install the
				<a
					href="https://chrome.google.com/webstore/detail/lamden-vault-browser-exte/fhfffofbcgbjjojdnpcfompojdjjhdim"
					target="_blank"
					rel="noreferrer">Lamden Vault</a
				> to use this panel.
			</div>
		{:else if !wallet_connected}
			<button
				on:click={handleConnectClicked}
				class="button btn-primary btn-wide btn-outline">connect wallet</button
			>
			<div class="explanation">Please connect your wallet.</div>
		{:else if wallet_locked}
			<button class="button btn-primary btn-rounded btn-wide btn-outline">Wallet Locked</button>
			<div class="explanation">Unlock your wallet</div>
		{:else if marmite_burn_value > approved_amount || (approved_amount === 0 && marmite_burn_value > 0)}
			<button
				on:click={handleApproveClicked}
				disabled={marmite_burn_value === 0 || approving}
				class="button btn-secondary btn-rounded btn-wide"
				>{approving ? 'Approving' : 'Approve'}</button
			>
			<div class="explanation">
				Please approve {marmite_burn_value - approved_amount} $MARMITE to be spent by
				<b>con_yeti</b>.
			</div>
		{:else}
			<button
				disabled={converting || !marmite_burn_value}
				on:click={handleBurnClicked}
				class="button btn-secondary btn-rounded btn-wide"
				>{converting ? 'converting ... ' : 'convert'}</button
			>
			<div class="explanation">Burn $MARMITE and receive $YETI</div>
		{/if}
	</div>
</div>

<style>
	.explanation {
		/* font-size: 0.8rem; */
		/* color: #999; */
		height: 1rem;
		margin-top: 1rem;
	}

	.explanation a {
		text-decoration: underline !important;
	}

	.button-cont {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.max-btn-cont {
		/* width: 140px !important; */
		min-width: 100px !important;
		/* width: 140px; */
	}

	.balance {
		/* padding-right: 120px; */
		display: flex;
		flex-direction: row-reverse;
		width: 100%;
		margin-bottom: 10px;
		letter-spacing: 0.3rem;
		min-height: 1.5vh;
	}
	.balance a {
		text-decoration: underline !important;
	}
	.input-container {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		/* justify-content: center; */
		/* width: rem; */
		height: 7rem;
		border: 1px solid #5e5e5e;
		border-radius: 5px;
		padding: 0 1rem;
	}

	.input-container input {
		height: 100%;
		width: 100%;
		text-align: right;
		/* padding: rem; */
		background-color: transparent;
		font-family: sans-serif;
		font-size: 1.7rem;
		padding-top: 0.9rem;
		padding-bottom: 0.3rem;
		letter-spacing: 0.4rem;
	}

	input:focus {
		outline: none;
	}

	input::placeholder {
		color: #5b5b5b;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}

	.token-name {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.token-symbol {
		font-size: 1.3rem;
		font-weight: 300;
	}
	.token-details-cont {
		letter-spacing: 0.4rem;
		display: flex;
		flex-direction: column;
		width: 140px;
	}
	.token-logo-cont {
		width: 5rem;
		margin-right: 1rem;
	}

	.token-logo-cont img {
		width: 100%;
		height: 100%;
	}
	.token-meta-cont {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.input-cont {
		display: flex;
		flex-direction: row;
	}

	.action-heading {
		font-size: 1.5rem;
		font-weight: 800;
		/* margin-bottom: rem; */
		/* text-decoration: underline; */
		text-transform: uppercase;
		letter-spacing: 0.25rem;
	}

	.convert-cont {
		display: flex;
		flex-direction: column;
		border: 3px solid #5e5e5e;
		border-radius: 10px;
		background-color: rgba(255,255,255, 0.8);
		box-shadow: inset 0 0 0 10px #5e5e5e;
		padding: 1.5rem 2rem;
		margin: 0 auto;
		/* margin-bottom: 2vh; */
	}

	@media (max-width: 768px) {
		.convert-cont {
			padding: 1.5rem 1rem;
			height: 100%;
			width: 100%;
		}
	}
</style>
