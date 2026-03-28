<script lang="ts">
	import { Collapsible } from 'bits-ui';
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import type { ExperienceEntryFormatted } from '$lib/utils/experience';

	let { experience }: { experience: ExperienceEntryFormatted } = $props();

	const hasAchievements = $derived(Boolean(experience.achievements?.length));
</script>

<div class="relative border-0 bg-transparent pl-6 outline-none">
	<div
		class="absolute top-[5px] -left-[5px] h-[10px] w-[10px] rounded-full bg-primary"
		aria-hidden="true"
	></div>

	<div class="space-y-2">
		{#if experience.datePeriod}
			<p class="text-xs text-subtle-foreground">{experience.datePeriod}</p>
		{/if}

		<div class="flex w-full flex-col gap-y-0.5 pr-0.5 xl:flex-row xl:flex-wrap xl:items-baseline xl:justify-between xl:gap-x-4 xl:gap-y-2">
			<h3 class="min-w-0 text-xl font-bold sm:text-[22px] lg:text-2xl xl:flex-1">
				{experience.position}
			</h3>
			<span
				class="shrink-0 text-base font-light text-subtle-foreground italic sm:text-lg lg:text-xl"
			>
				{experience.company}
			</span>
		</div>

		{#if experience.description}
			<p class="text-sm text-muted-foreground sm:text-base">{experience.description}</p>
		{/if}

		{#if hasAchievements}
			<Collapsible.Root class="w-full">
				<Collapsible.Trigger
					class="group/details flex w-full items-center gap-1.5 rounded-sm py-0.5 text-left text-sm text-subtle-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
				>
					<span class="font-medium">Learn More</span>
					<Icon
						icon="mdi:chevron-down"
						class="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/details:rotate-180"
						aria-hidden="true"
					/>
				</Collapsible.Trigger>
				<Collapsible.Content
					class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
				>
					<ul
						class="list-outside list-disc space-y-1.5 pt-2 pl-5 text-sm text-muted-foreground marker:text-muted-foreground sm:text-base"
					>
						{#each experience.achievements ?? [] as line, i (i)}
							<li class="text-pretty">{line}</li>
						{/each}
					</ul>
				</Collapsible.Content>
			</Collapsible.Root>
		{/if}

		{#if experience.technologies.length}
			<div class="flex flex-wrap gap-2 pt-1">
				{#each experience.technologies as tech (tech)}
					<Badge
						class="rounded-sm border-transparent bg-badge-tech px-2.5 py-0.5 font-['DM_Sans'] text-xs font-bold text-white"
					>
						{tech}
					</Badge>
				{/each}
			</div>
		{/if}
	</div>
</div>
