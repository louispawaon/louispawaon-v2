<script lang="ts">
	import Icon from '@iconify/svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import type { ExperienceEntryFormatted } from '$lib/utils/experience';

	let {
		experiences,
		ctaText,
		ctaHref
	}: {
		experiences: ExperienceEntryFormatted[];
		ctaText: string;
		ctaHref: string;
	} = $props();
</script>

{#if experiences.length}
	<section class="flex flex-col gap-[34px]">
		<div class="border-l-2 border-l-[#1C3A5A]">
			<div class="flex flex-col gap-[32px]">
				{#each experiences as experience}
					<ExperienceCard {experience} />
				{/each}
			</div>
		</div>

		<a
			href={ctaHref}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-1.5 text-sm font-light text-[#AAAAAA] italic transition-colors hover:text-primary sm:text-base"
		>
			{ctaText}
			<Icon icon="mdi:arrow-right" class="h-4 w-4" />
		</a>
	</section>
{/if}
