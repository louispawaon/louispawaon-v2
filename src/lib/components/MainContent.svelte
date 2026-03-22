<script lang="ts">
	import IntroSection from '$lib/components/IntroSection.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
	import type { HomepageContent } from '../../routes/+page';
	import type { ExperienceEntryFormatted } from '$lib/utils/experience';
	import type { ProjectEntry } from '$lib/utils/projects';

	let {
		homepage,
		experiences,
		featuredProjects,
		connectEmailHref = ''
	}: {
		homepage: HomepageContent;
		experiences: ExperienceEntryFormatted[];
		featuredProjects: ProjectEntry[];
		connectEmailHref?: string;
	} = $props();
</script>

<div class="flex flex-col">
	<IntroSection
		id="intro"
		name={homepage.name}
		introLine={homepage.introLine}
		description={homepage.description}
		ctaText={homepage.ctaText}
		ctaHref={homepage.ctaHref}
		{connectEmailHref}
	/>

	<div class="mt-[135px]">
		<RevealOnScroll>
			<ExperienceSection
				id="experience"
				{experiences}
				ctaText={homepage.experienceCtaText}
				ctaHref={homepage.experienceCtaHref}
			/>
		</RevealOnScroll>
	</div>

	<div class="mt-[135px]">
		<RevealOnScroll>
			<ProjectsSection
				id="projects"
				projects={featuredProjects}
				ctaText={homepage.projectsCtaText}
				ctaHref={homepage.projectsCtaHref}
			/>
		</RevealOnScroll>
	</div>
</div>
