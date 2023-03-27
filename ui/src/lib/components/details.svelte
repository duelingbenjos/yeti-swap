<script lang="ts">
	/**
	 *
	 */

	import { onMount } from 'svelte';
	import ConvertPanel from './convert-panel.svelte';
	import dab from '$lib/assets/images/dab.png';
	let screen_width: number;
</script>

<div class="landing-cont">
	<div class="detail-heading text-center mt-20">Convert $MARMITE to $YETI</div>
	<div class="content-row">
		<ConvertPanel />
	</div>

	<!-- <div class="content-row justify-center mb-40">
		<div class="text-content mt-10 w-60">
			<div class="socials">
				<div class="social-logo-cont">
					<a href="https://t.me/LamdenPortal" rel="noreferrer" target="_blank">
						<img src={logo_telegram} alt="telegram" />
					</a>
				</div>
			</div>
		</div>
	</div> -->
</div>

<style>
	.socials {
		display: flex;

		flex-direction: row;
		align-items: center;
		justify-content: center;
		border: 2px solid #c6b594;
		border-radius: 10px;
		width: 50%;
		margin: 0 auto;

		/* padding: 2rem; */
		/* min-width: 200px; */
	}

	.social-logo-cont {
		width: 4rem;
		height: 4rem;
		margin: 0 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.token-dist li {
		font-size: 1rem;
	}

	#portal-token-design {
		width: 100%;
		padding: 3vw 3vh;
	}

	.content-image-cont {
		width: 40%;
	}

	.content-row {
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 3vw 3vh 0vh 3vw;
	}

	.text-left {
		text-align: left;
	}

	.topic-text {
		font-size: 0.9rem;
		font-weight: 400;
		letter-spacing: 0.2rem;
		margin-bottom: 3rem;
	}

	.topic-text > p,
	ul {
		margin-bottom: 1rem;
	}

	.topic-title {
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 1.3rem;
		letter-spacing: 0.4rem;
		text-decoration: underline;
	}

	.detail-heading {
		font-size: 6rem;
		font-weight: 800;
		letter-spacing: 0.7rem;
		mix-blend-mode: difference;
		/* color-scheme: dark; */
	}

	.text-content {
		width: 60%;
	}

	.detail-subheading {
		font-size: 0.8rem;
		font-weight: 400;
		letter-spacing: 0.4rem;
		margin-bottom: 3rem;
	}

	.landing-cont {
		/* margin: 5vh auto; */
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #5b5b5b;
		z-index: 1;
		min-width: none;
		height: 100%;
		background-color: rgba(194, 202, 239, 1);
		height: 100vh;
		background-image: url('./dab.png');
		background-size: 300vh;
		background-position: 0% 100%;
		/* max-width: 1200px; */
	}

	a {
		/* color: #c6b594; */
		text-decoration: underline;
	}

	ul > li:before {
		content: '•';
		color: #c6b594;
		display: inline-block;
		width: 1em;
		margin-left: 1em;
	}

	ul > li {
		margin-bottom: 1rem;
	}

	@media (min-width: 1200px) {
	}

	@media (max-width: 800px) {
		.content-row {
			flex-direction: column;
		}

		.content-image-cont {
			margin: 0 auto;
			width: 80%;
		}

		.text-content {
			width: 100%;
		}
	}
</style>
