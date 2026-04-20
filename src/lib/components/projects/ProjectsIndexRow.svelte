<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import {
		projectIndexAction,
		projectIndexSubtitle,
		type ProjectEntry
	} from '$lib/utils/projects';

	let { project }: { project: ProjectEntry } = $props();

	const action = $derived(projectIndexAction(project));
	const subtitle = $derived(projectIndexSubtitle(project));

	const pillClass =
		"rounded-[6px] border-transparent bg-badge-tech px-1.5 py-px font-['DM_Sans'] text-xs font-bold text-white";
</script>

<article
	class="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-x-8 md:items-start"
>
	<div class="min-w-0">
		{#if project.hasDetailPage}
			<a
				href="/projects/{project.slug}"
				class="font-['DM_Sans'] text-[32px] leading-tight font-bold text-muted-foreground transition-colors hover:text-primary"
			>
				{project.title}
			</a>
		{:else}
			<p class="font-['DM_Sans'] text-[32px] leading-tight font-bold text-muted-foreground">
				{project.title}
			</p>
		{/if}
		{#if subtitle}
			<p class="mt-1 font-['Epilogue'] text-xl font-medium text-subtle-foreground">
				{subtitle}
			</p>
		{/if}
	</div>

	<div class="min-w-0 md:pt-0.5">
		{#if project.technologies.length > 0}
			<ul
				class="m-0 grid w-max max-w-full list-none grid-cols-[repeat(3,max-content)] gap-4 p-0"
			>
				{#each project.technologies as tech (tech)}
					<li class="min-w-0 max-w-full">
						<Badge class={`${pillClass} max-w-full truncate`}>{tech}</Badge>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div
		class="flex shrink-0 justify-start md:min-w-30 md:max-w-30 md:justify-end md:text-right"
	>
		{#if action.kind === 'link'}
			<a
				href={action.href}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 font-['Epilogue'] text-xl font-medium whitespace-nowrap text-primary transition-opacity hover:opacity-90"
			>
				{action.label}
				<Icon icon="mdi:arrow-top-right" class="h-4 w-4 shrink-0 sm:h-4.5 sm:w-4.5" aria-hidden="true" />
			</a>
		{:else}
			<span
				class="inline-flex items-center gap-1.5 font-['Epilogue'] text-xl font-medium whitespace-nowrap text-subtle-foreground"
			>
				{action.label}
			</span>
		{/if}
	</div>
</article>
