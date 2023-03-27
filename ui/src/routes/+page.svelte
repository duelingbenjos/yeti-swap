<script lang="ts">
	import Landing from '../lib/components/landing.svelte';
	import Details from '../lib/components/details.svelte';

	let screen_width: number;

	function scrollIntoView(section: string) {
		const el = document.querySelector((`${section}`));
		if (!el) return;
		el.scrollIntoView({
			behavior: 'smooth'
		});
	}
</script>

<Details />
