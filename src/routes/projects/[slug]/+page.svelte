<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProjectImageCarousel from '$lib/components/projects/ProjectImageCarousel.svelte';
	import ProjectLedeQuote from '$lib/components/projects/ProjectLedeQuote.svelte';
	import ProjectNarrativeSection from '$lib/components/projects/ProjectNarrativeSection.svelte';
	import ProjectOutcomePanel from '$lib/components/projects/ProjectOutcomePanel.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { flyUnlessReduced } from '$lib/utils/motion-transitions';
	import { formatProjectTypeDisplay, projectDisplayYear } from '$lib/utils/projects';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const project = $derived(data.project);
	const carouselImages = $derived(data.carouselImages);
	const displayRoles = $derived(data.displayRoles);

	const demoHref = $derived((project.demoUrl ?? '').trim());
	const repoHref = $derived((project.githubUrl ?? '').trim());
	const hasProjectLinks = $derived(demoHref.length > 0 || repoHref.length > 0);

	const typePill = $derived(formatProjectTypeDisplay(project.projectType));
	const yearLabel = $derived(projectDisplayYear(project));
	const statusLabel = $derived((project.status ?? '').trim());

	const neutralPillClass =
		"rounded-sm border-transparent bg-surface-raised px-1.5 py-px font-['DM_Sans'] text-xs font-bold text-white";
	const statusLivePillClass =
		"rounded-sm border-transparent bg-badge-tech px-1.5 py-px font-['DM_Sans'] text-xs font-bold text-white";

	const showPillsRow = $derived(
		Boolean(
			typePill ||
				displayRoles.length > 0 ||
				yearLabel ||
				statusLabel
		)
	);

	function hasItems(items: string[]): boolean {
		return items.length > 0;
	}
</script>

<div class="flex flex-col">
	{#key project.slug}
		<div
			in:flyUnlessReduced={{ y: 16, duration: 420, delay: 90, opacity: 0 }}
			class="mb-10 flex flex-col"
		>
			<div class="flex flex-col gap-4">
				{#if showPillsRow}
					<div class="flex flex-wrap items-center gap-4">
						{#if typePill}
							<Badge class={neutralPillClass}>{typePill}</Badge>
						{/if}
						{#each displayRoles as role (role)}
							<Badge class={neutralPillClass}>{role}</Badge>
						{/each}
						{#if yearLabel}
							<Badge class={neutralPillClass}>{yearLabel}</Badge>
						{/if}
						{#if statusLabel}
							<Badge class={project.ifLive === true ? statusLivePillClass : neutralPillClass}>
								{statusLabel}
							</Badge>
						{/if}
					</div>
				{/if}

				<h1
					class="font-['DM_Sans'] text-3xl leading-tight font-bold text-foreground sm:text-5xl"
				>
					{project.title}
				</h1>

				<ProjectLedeQuote lede={project.lede ?? ''} tone="foreground" />
			</div>

			<div class="mt-8">
				<ProjectImageCarousel
					images={carouselImages}
					imageAltBase={project.title}
					coverTransitionSlug={project.featuredImage ? project.slug : null}
				/>
			</div>
		</div>

		<div
			in:flyUnlessReduced={{ y: 18, duration: 480, delay: 200, opacity: 0 }}
			class="mt-10 flex flex-col gap-[72px]"
		>
			<ProjectNarrativeSection title="The Problem" block={project.problem} />
			<ProjectNarrativeSection title="The Approach" block={project.approach} />
			<ProjectNarrativeSection
				title="Technical decisions worth noting"
				block={project.technicalDecisions}
				pills={project.technologies}
			/>

			{#if hasItems(project.outcome)}
				<section class="flex flex-col">
					<h2
						class="font-['DM_Sans'] text-base font-bold tracking-wide text-primary uppercase"
					>
						Outcome
					</h2>
					<div class="mt-8">
						<ProjectOutcomePanel items={project.outcome} />
					</div>
				</section>
			{/if}

			{#if hasProjectLinks}
				<section class="flex flex-row flex-wrap items-center gap-8">
					{#if demoHref}
						<a
							href={demoHref}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 rounded-[6px] border border-transparent bg-badge-tech px-3 py-1.5 font-['DM_Sans'] text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:text-base"
						>
							View Live Project
							<Icon icon="mdi:arrow-top-right" class="h-4 w-4 shrink-0 sm:h-4.5 sm:w-4.5" aria-hidden="true" />
						</a>
					{/if}
					{#if repoHref}
						<a
							href={repoHref}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 rounded-[6px] border border-transparent bg-surface-raised px-3 py-1.5 font-['DM_Sans'] text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:text-base"
						>
							Visit Repository
							<Icon icon="mdi:arrow-top-right" class="h-4 w-4 shrink-0 sm:h-4.5 sm:w-4.5" aria-hidden="true" />
						</a>
					{/if}
				</section>
			{/if}
		</div>
	{/key}
</div>
