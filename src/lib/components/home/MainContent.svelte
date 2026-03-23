<script lang="ts">
	import IntroSection from '$lib/components/home/IntroSection.svelte';
	import ExperienceSection from '$lib/components/home/ExperienceSection.svelte';
	import ProjectsSection from '$lib/components/home/ProjectsSection.svelte';
	import RevealOnScroll from '$lib/components/shared/RevealOnScroll.svelte';
	import type { ExperienceEntryFormatted } from '$lib/utils/experience';
	import type { ProjectEntry } from '$lib/utils/projects';

	export type HomepageContent = {
		name: string;
		introLine: string;
		description: string;
		ctaText: string;
		ctaHref: string;
		experienceCtaText: string;
		experienceCtaHref: string;
		projectsCtaText?: string;
		projectsCtaHref?: string;
	};

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

	<div class="mt-section">
		<RevealOnScroll>
			<ExperienceSection
				id="experience"
				{experiences}
				ctaText={homepage.experienceCtaText}
				ctaHref={homepage.experienceCtaHref}
			/>
		</RevealOnScroll>
	</div>

	<div class="mt-section">
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
