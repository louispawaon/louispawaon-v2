<script lang="ts">
	import MainContent from '$lib/components/home/MainContent.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const connectEmailHref = $derived(
		data.settings.socialLinks.find((l) => l.kind === 'email')?.href ?? ''
	);
</script>

<MainContent
	homepage={data.homepage}
	experiences={data.experiences}
	featuredProjects={data.featuredProjects}
	{connectEmailHref}
/>
