<script lang="ts">
	import ProjectsYearSection from '$lib/components/projects/ProjectsYearSection.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col gap-16">
	{#if data.yearGroups.length === 0}
		<p class="font-['Epilogue'] text-lg text-muted-foreground">No projects yet.</p>
	{:else}
		{#each data.yearGroups as group (group.year)}
			<ProjectsYearSection year={group.year} projects={group.projects} />
		{/each}
	{/if}
</div>
