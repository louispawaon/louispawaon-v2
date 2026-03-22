<script lang="ts">
	import ProjectGridCard from '$lib/components/ProjectGridCard.svelte';
	import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<meta name="description" content="Project archive" />
</svelte:head>

<div class="flex flex-col gap-8">
	{#if data.projects.length === 0}
		<p class="text-sm text-muted-foreground">No projects yet.</p>
	{:else}
		<RevealOnScroll>
			<ul
				class="grid list-none grid-cols-1 gap-x-[66px] gap-y-[34px] p-0 sm:grid-cols-2 lg:grid-cols-3"
			>
				{#each data.projects as project}
					<li class="min-w-0">
						<ProjectGridCard {project} />
					</li>
				{/each}
			</ul>
		</RevealOnScroll>
	{/if}
</div>
