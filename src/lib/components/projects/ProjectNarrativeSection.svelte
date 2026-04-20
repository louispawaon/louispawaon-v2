<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import type { ProjectNarrativeBlock } from '$lib/utils/projects';

	let {
		title,
		block,
		pills = []
	}: {
		title: string;
		block: ProjectNarrativeBlock | undefined;
		/** Tech stack labels shown below narrative (e.g. under Technical decisions). */
		pills?: string[];
	} = $props();

	const context = $derived(block?.context?.trim() ?? '');
	const subcontext = $derived(block?.subcontext?.trim() ?? '');
	const stackPills = $derived(pills.map((t) => t.trim()).filter((t) => t.length > 0));
	const show = $derived(Boolean(context || subcontext || stackPills.length > 0));

	const stackPillClass =
		"rounded-[6px] border-transparent bg-badge-tech px-1.5 py-px font-['DM_Sans'] text-xs font-bold text-white";
</script>

{#if show}
	<section class="flex flex-col">
		<h2 class="font-['DM_Sans'] text-base font-bold tracking-wide text-primary uppercase">
			{title}
		</h2>
		<div class="mt-8 flex flex-col gap-8">
			{#if context || subcontext}
				<div class="flex flex-col gap-3">
					{#if context}
						<p class="font-['Epilogue'] text-lg leading-relaxed text-muted-foreground">
							{context}
						</p>
					{/if}
					{#if subcontext}
						<p
							class="font-['Epilogue'] text-lg leading-relaxed whitespace-pre-line text-subtle-foreground"
						>
							{subcontext}
						</p>
					{/if}
				</div>
			{/if}
			{#if stackPills.length > 0}
				<ul
					class="m-0 grid w-max max-w-full list-none grid-cols-[repeat(3,max-content)] gap-4 p-0"
				>
					{#each stackPills as tech (tech)}
						<li>
							<Badge class={stackPillClass}>{tech}</Badge>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</section>
{/if}
