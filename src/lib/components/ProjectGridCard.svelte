<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { projectCoverTransitionName, rolesForHomepage, type ProjectEntry } from '$lib/utils/projects';

	let { project }: { project: ProjectEntry } = $props();
</script>

<a
	href="/projects/{project.slug}"
	class="group flex min-w-0 flex-col rounded-3xl text-inherit no-underline outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
>
	<Card variant="project" class="transition-opacity group-hover:opacity-90">
		<CardContent class="px-0">
			<div class="relative aspect-square w-full min-w-0 overflow-hidden bg-background/30">
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
	<h3 class="mt-4 font-['DM_Sans'] text-xl font-bold text-white">{project.title}</h3>
	{#if rolesForHomepage(project).length}
		<div class="flex flex-wrap gap-2 pt-2">
			{#each rolesForHomepage(project) as role}
				<Badge
					class="rounded-[6px] border-transparent bg-[#333333] px-2.5 py-0.5 font-['DM_Sans'] text-xs font-bold text-white"
				>
					{role}
				</Badge>
			{/each}
		</div>
	{/if}
</a>
