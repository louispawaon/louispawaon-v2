<script lang="ts">
	import { projectTechPillClass } from '$lib/styles/project-pill-classes';
	import { cn } from '$lib/utils';

	let {
		technologies,
		truncatePills = false,
		class: className = ''
	}: {
		technologies: string[];
		/** When true, labels truncate for narrow grid cells (e.g. /projects index). */
		truncatePills?: boolean;
		class?: string;
	} = $props();

	const items = $derived(technologies.map((t) => t.trim()).filter((t) => t.length > 0));
</script>

{#if items.length > 0}
	<ul
		class={cn(
			'm-0 grid w-max max-w-full list-none grid-cols-[repeat(3,max-content)] gap-4 p-0',
			className
		)}
	>
		{#each items as tech (tech)}
			<li class="min-w-0 max-w-full">
				<span
					class={cn(
						projectTechPillClass,
						'inline-flex max-w-full min-w-0 shrink-0 items-center justify-center whitespace-nowrap',
						truncatePills && 'truncate'
					)}
				>
					{tech}
				</span>
			</li>
		{/each}
	</ul>
{/if}
