<script lang="ts">
	import AboutMeSection from '$lib/components/AboutMeSection.svelte';
	import TechStackSection from '$lib/components/TechStackSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col">
	<AboutMeSection
		fullName={data.about.fullName}
		nickname={data.about.nickname}
		introLine={data.about.introLine}
		description={data.about.description}
	/>

	<div class="mt-[135px]">
		<TechStackSection intro={data.about.techStackIntro} groups={data.techStack} />
	</div>
</div>
