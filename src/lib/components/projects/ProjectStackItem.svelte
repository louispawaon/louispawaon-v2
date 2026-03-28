<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { projectCoverTransitionName, rolesForHomepage, type ProjectEntry } from '$lib/utils/projects';

	let { project }: { project: ProjectEntry } = $props();

	const roles = $derived(rolesForHomepage(project));
</script>

<li class="project-item relative">
	<a
		href="/projects/{project.slug}"
		class="group flex min-w-0 flex-col rounded-3xl text-inherit no-underline outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
	>
		<div
			class="card-lift transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-within:translate-y-0 group-hover:-translate-y-3 group-focus-within:-translate-y-3 md:group-hover:-translate-y-4 md:group-focus-within:-translate-y-4"
		>
			<Card variant="project" class="w-[840px] max-w-full transition-opacity group-hover:opacity-90">
				<CardContent class="px-0">
					<div
						class="relative aspect-video w-full min-w-0 overflow-hidden bg-background/30"
					>
						{#if project.featuredImage}
							<img
								src={project.featuredImage}
								alt=""
								class="h-full w-full object-cover"
								loading="lazy"
								decoding="async"
								style:view-transition-name={projectCoverTransitionName(project.slug)}
							/>
						{/if}
					</div>
				</CardContent>
			</Card>
		</div>

		<div
			class="project-item-meta flex flex-row flex-wrap items-start justify-between gap-x-4 gap-y-2"
		>
			<h3 class="min-w-0 shrink font-['DM_Sans'] text-xl font-bold text-white">{project.title}</h3>
			{#if roles.length}
				<div class="flex max-w-full flex-wrap justify-end gap-2">
					{#each roles as role}
						<Badge
							class="rounded-sm border-transparent bg-surface-raised px-2.5 py-0.5 font-['DM_Sans'] text-xs font-bold text-white"
						>
							{role}
						</Badge>
					{/each}
				</div>
			{/if}
		</div>
	</a>
</li>

<style>
	@media (hover: hover) {
		.project-item-meta {
			max-height: 0;
			opacity: 0;
			overflow: hidden;
			margin-top: 0;
			pointer-events: none;
			transition:
				opacity 280ms ease-out,
				max-height 320ms ease-out,
				margin-top 280ms ease-out;
		}

		.project-item:hover .project-item-meta,
		.project-item:focus-within .project-item-meta {
			max-height: 10rem;
			opacity: 1;
			margin-top: 0.5rem;
			overflow: visible;
			pointer-events: auto;
		}
	}

	@media (hover: none) {
		.project-item-meta {
			margin-top: 0.5rem;
			max-height: none;
			opacity: 1;
			overflow: visible;
			pointer-events: auto;
		}
	}
</style>
