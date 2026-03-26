<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import Icon from '@iconify/svelte';
	import ExperienceCard from '$lib/components/home/ExperienceCard.svelte';
	import type { ExperienceEntryFormatted } from '$lib/utils/experience';

	let {
		experiences,
		ctaText,
		ctaHref,
		id: sectionId = undefined
	}: {
		experiences: ExperienceEntryFormatted[];
		ctaText: string;
		ctaHref: string;
		id?: string;
	} = $props();

	const ctaHrefTrim = $derived(ctaHref.trim());
	const ctaIsExternal = $derived(/^https?:\/\//i.test(ctaHrefTrim) || ctaHrefTrim.startsWith('//'));
	const ctaInternalPath = $derived(ctaHrefTrim.startsWith('/') ? ctaHrefTrim : `/${ctaHrefTrim}`);
</script>

{#if experiences.length}
	<section id={sectionId} class="flex flex-col gap-section-gap">
		<div class="border-l-2 border-l-timeline-accent">
			<div class="flex flex-col gap-[32px]">
				{#each experiences as experience, i (`${experience.company}-${experience.startDate}-${i}`)}
					<ExperienceCard {experience} />
				{/each}
			</div>
		</div>

		{#if ctaIsExternal}
			<a
				href={ctaHrefTrim}
				target="_blank"
				rel="noopener noreferrer external"
				class="inline-flex items-center gap-1.5 text-sm font-light text-subtle-foreground italic transition-colors hover:text-primary sm:text-base"
			>
				{ctaText}
				<Icon icon="mdi:arrow-right" class="h-4 w-4" />
			</a>
		{:else}
			<a
				href={resolve(ctaInternalPath as Pathname)}
				class="inline-flex items-center gap-1.5 text-sm font-light text-subtle-foreground italic transition-colors hover:text-primary sm:text-base"
			>
				{ctaText}
				<Icon icon="mdi:arrow-right" class="h-4 w-4" />
			</a>
		{/if}
	</section>
{/if}
