<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProjectTechPillGrid from '$lib/components/projects/ProjectTechPillGrid.svelte';
	import {
		projectIndexAction,
		projectIndexSubtitle,
		type ProjectEntry
	} from '$lib/utils/projects';

	let { project }: { project: ProjectEntry } = $props();

	const action = $derived(projectIndexAction(project));
	const subtitle = $derived(projectIndexSubtitle(project));
</script>

<article
	class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:gap-x-8 lg:items-start"
>
	<div class="min-w-0">
		<h3 class="m-0 p-0 font-normal">
			{#if project.hasDetailPage}
				<a
					href="/projects/{project.slug}"
					class="block font-dm-sans text-lg leading-tight font-bold text-muted-foreground no-underline transition-colors hover:text-primary sm:text-xl md:text-2xl lg:text-project-index-title"
				>
					{project.title}
				</a>
			{:else}
				<span
					class="block font-dm-sans text-lg leading-tight font-bold text-muted-foreground sm:text-xl md:text-2xl lg:text-project-index-title"
				>
					{project.title}
				</span>
			{/if}
		</h3>
		{#if subtitle}
			<p class="mt-1 font-epilogue text-sm font-medium text-subtle-foreground sm:text-base md:text-lg lg:text-xl">
				{subtitle}
			</p>
		{/if}
	</div>

	<div class="min-w-0 lg:pt-0.5">
		<ProjectTechPillGrid technologies={project.technologies} truncatePills />
	</div>

	<div
		class="flex shrink-0 justify-start lg:w-project-index-action lg:min-w-project-index-action lg:max-w-project-index-action lg:justify-end lg:text-right"
	>
		{#if action.kind === 'link'}
			<a
				href={action.href}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 font-epilogue text-sm font-medium whitespace-nowrap text-primary transition-opacity hover:opacity-90 sm:text-base md:text-lg lg:text-xl"
			>
				{action.label}
				<Icon icon="mdi:arrow-top-right" class="h-4 w-4 shrink-0 sm:h-4.5 sm:w-4.5" aria-hidden="true" />
			</a>
		{:else}
			<span
				class="inline-flex items-center gap-1.5 font-epilogue text-sm font-medium whitespace-nowrap text-subtle-foreground sm:text-base md:text-lg lg:text-xl"
			>
				{action.label}
			</span>
		{/if}
	</div>
</article>
