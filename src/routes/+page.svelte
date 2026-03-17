<script lang="ts">
	import MainContent from '$lib/components/MainContent.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<MainContent homepage={data.homepage} experiences={data.experiences} />
