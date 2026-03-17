<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import type { ExperienceEntryFormatted } from '$lib/utils/experience';

	let {
		experience
	}: {
		experience: ExperienceEntryFormatted;
	} = $props();
</script>

<div class="relative pl-6">
	<div
		class="absolute -left-[5px] top-[5px] h-[10px] w-[10px] rounded-full bg-primary"
		aria-hidden="true"
	></div>

	<div class="space-y-2">
		<p class="text-xs text-[#AAAAAA] sm:text-[12px]">{experience.datePeriod}</p>

		<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
			<h3 class="text-xl font-bold sm:text-[22px] lg:text-2xl">{experience.position}</h3>
			<span class="text-lg font-light italic text-[#AAAAAA] sm:text-[18px] lg:text-xl">
				{experience.company}
			</span>
		</div>

		<p class="text-sm text-muted-foreground sm:text-base">{experience.description}</p>

		{#if experience.technologies.length}
			<div class="flex flex-wrap gap-2 pt-1">
				{#each experience.technologies as tech}
					<Badge
						class="rounded-[6px] px-2.5 py-0.5 border-transparent bg-[#2C99FF] font-['DM_Sans'] text-xs font-bold text-white"
					>
						{tech}
					</Badge>
				{/each}
			</div>
		{/if}
	</div>
</div>
