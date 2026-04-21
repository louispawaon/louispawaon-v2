<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import {
		projectCoverTransitionName,
		rolesForHomepage,
		type ProjectDetailFrom,
		type ProjectEntry,
		type ProjectType
	} from '$lib/utils/projects';

	let {
		project,
		from = 'projects'
	}: { project: ProjectEntry; from?: ProjectDetailFrom } = $props();

	const projectHref = $derived(`/projects/${project.slug}?from=${from}`);

	const roles = $derived(rolesForHomepage(project));

	function formatProjectType(t: ProjectType | undefined): string | undefined {
		if (!t) return undefined;
		return t.charAt(0).toUpperCase() + t.slice(1);
	}

	const typePart = $derived(formatProjectType(project.projectType));
	const rolesPart = $derived(roles.length ? roles.join(', ') : '');
	const eyebrow = $derived(
		typePart && rolesPart ? `${typePart} · ${rolesPart}` : (typePart ?? rolesPart ?? '')
	);

	const previewProblem = $derived((project.previewProblem ?? '').trim());
	const previewOutcome = $derived((project.previewOutcome ?? '').trim());
	const hasImage = $derived(Boolean(project.featuredImage?.trim()));
</script>

<li class="project-item w-full min-w-0">
	<a
		href={projectHref}
		class="group flex min-w-0 flex-col gap-3 rounded-sm text-inherit no-underline outline-offset-4 transition-opacity hover:opacity-95 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-ring lg:flex-row lg:items-start"
	>
		<div class="flex min-w-0 flex-1 flex-col gap-3">
			{#if eyebrow}
				<p class="font-epilogue text-xs font-medium text-subtle-foreground">
					{eyebrow}
				</p>
			{/if}

			<h3
				class="font-dm-sans text-lg font-bold leading-tight text-muted-foreground sm:text-xl md:text-2xl lg:text-[28px]"
			>
				{project.title}
			</h3>

			{#if previewProblem}
				<p class="font-epilogue text-sm font-normal text-muted-foreground text-pretty sm:text-base">
					{previewProblem}
				</p>
			{/if}

			{#if previewOutcome}
				<p
					class="inline-flex items-center gap-1 font-epilogue text-xs font-normal text-primary"
				>
					<Icon icon="mdi:arrow-right" class="size-3.5 shrink-0" aria-hidden="true" />
					{previewOutcome}
				</p>
			{/if}

			{#if project.technologies.length}
				<div class="flex flex-wrap gap-1.5 pt-0.5 sm:gap-2">
					{#each project.technologies as tech (tech)}
						<Badge
							class="rounded-sm border-transparent bg-badge-tech px-2.5 py-0.5 font-dm-sans text-xs font-bold text-white"
						>
							{tech}
						</Badge>
					{/each}
				</div>
			{/if}
		</div>

		{#if hasImage}
			<div
				class="mx-auto h-[220px] w-full max-w-lg shrink-0 overflow-hidden rounded-[25px] border border-border-visible bg-background/30 lg:mx-0 lg:w-[415px] lg:max-w-[415px]"
			>
				<img
					src={project.featuredImage}
					alt=""
					class="h-full w-full object-cover"
					loading="lazy"
					decoding="async"
					style:view-transition-name={projectCoverTransitionName(project.slug)}
				/>
			</div>
		{/if}
	</a>
</li>
