<script lang="ts">
	import IntroSection from '$lib/components/IntroSection.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import type { HomepageContent } from '../../routes/+page';
	import type { ExperienceEntryFormatted } from '$lib/utils/experience';

	let {
		homepage,
		experiences
	}: {
		homepage: HomepageContent;
		experiences: ExperienceEntryFormatted[];
	} = $props();
</script>

<div class="flex flex-col">
	<IntroSection
		name={homepage.name}
		introLine={homepage.introLine}
		description={homepage.description}
		ctaText={homepage.ctaText}
		ctaHref={homepage.ctaHref}
	/>

	<div class="mt-[135px]">
		<ExperienceSection
			{experiences}
			ctaText={homepage.experienceCtaText}
			ctaHref={homepage.experienceCtaHref}
		/>
	</div>
</div>
