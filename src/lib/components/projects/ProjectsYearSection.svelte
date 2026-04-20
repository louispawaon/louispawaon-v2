<script lang="ts">
	import ProjectsIndexRow from '$lib/components/projects/ProjectsIndexRow.svelte';
	import type { ProjectEntry } from '$lib/utils/projects';

	let { year, projects }: { year: string; projects: ProjectEntry[] } = $props();
</script>

<section class="flex flex-col">
	<h2 class="font-epilogue text-2xl font-medium text-subtle-foreground">{year}</h2>
	<div class="mt-4 h-px w-full shrink-0 bg-subtle-foreground" aria-hidden="true"></div>
	<div class="mt-8 flex flex-col gap-8">
		{#each projects as project (project.slug)}
			<ProjectsIndexRow {project} />
		{/each}
	</div>
</section>
