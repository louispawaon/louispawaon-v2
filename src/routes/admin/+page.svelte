<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		// Load Sveltia CMS script
		const script = document.createElement('script');
		script.src = 'https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js';
		document.body.appendChild(script);

		return () => {
			// Cleanup on component destroy
			if (script.parentNode) {
				script.parentNode.removeChild(script);
			}
		};
	});
</script>

<svelte:head>
	<title>Sveltia CMS</title>
	<meta name="robots" content="noindex" />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<style>
		:global(body) {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
				sans-serif;
			margin: 0;
			padding: 0;
		}
	</style>
</svelte:head>
