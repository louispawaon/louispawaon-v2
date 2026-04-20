<script lang="ts">
	import ProjectTechPillGrid from '$lib/components/projects/ProjectTechPillGrid.svelte';
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
</script>

{#if show}
	<section class="flex flex-col">
		<h2 class="font-dm-sans text-base font-bold tracking-wide text-primary uppercase">
			{title}
		</h2>
		<div class="mt-8 flex flex-col gap-8">
			{#if context || subcontext}
				<div class="flex flex-col gap-3">
					{#if context}
						<p class="font-epilogue text-lg leading-relaxed text-muted-foreground">
							{context}
						</p>
					{/if}
					{#if subcontext}
						<p
							class="font-epilogue text-lg leading-relaxed whitespace-pre-line text-subtle-foreground"
						>
							{subcontext}
						</p>
					{/if}
				</div>
			{/if}
			<ProjectTechPillGrid technologies={pills} />
		</div>
	</section>
{/if}
