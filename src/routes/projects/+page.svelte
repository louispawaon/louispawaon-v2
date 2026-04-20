<script lang="ts">
	import ProjectsYearSection from '$lib/components/projects/ProjectsYearSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col">
	<h1 class="font-dm-sans text-3xl leading-tight font-bold text-foreground sm:text-4xl">
		Projects
	</h1>
	<div class="mt-10 flex flex-col gap-project-index-year-stack">
		{#if data.yearGroups.length === 0}
			<p class="font-epilogue text-lg text-muted-foreground">No projects yet.</p>
		{:else}
			{#each data.yearGroups as group (group.year)}
				<ProjectsYearSection year={group.year} projects={group.projects} />
			{/each}
		{/if}
	</div>
</div>
