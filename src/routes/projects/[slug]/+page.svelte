<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProjectImageCarousel from '$lib/components/projects/ProjectImageCarousel.svelte';
	import ProjectLedeQuote from '$lib/components/projects/ProjectLedeQuote.svelte';
	import ProjectNarrativeSection from '$lib/components/projects/ProjectNarrativeSection.svelte';
	import ProjectOutcomePanel from '$lib/components/projects/ProjectOutcomePanel.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import {
		projectLinkCtaAccentClass,
		projectLinkCtaNeutralClass,
		projectMetadataBadgeLiveClass,
		projectMetadataBadgeNeutralClass
	} from '$lib/styles/project-pill-classes';
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
							<Badge class={projectMetadataBadgeNeutralClass}>{typePill}</Badge>
						{/if}
						{#each displayRoles as role (role)}
							<Badge class={projectMetadataBadgeNeutralClass}>{role}</Badge>
						{/each}
						{#if yearLabel}
							<Badge class={projectMetadataBadgeNeutralClass}>{yearLabel}</Badge>
						{/if}
						{#if statusLabel}
							<Badge
								class={project.ifLive === true
									? projectMetadataBadgeLiveClass
									: projectMetadataBadgeNeutralClass}
							>
								{statusLabel}
							</Badge>
						{/if}
					</div>
				{/if}

				<h1 class="font-dm-sans text-3xl leading-tight font-bold text-foreground sm:text-5xl">
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
			class="mt-10 flex flex-col gap-project-detail-stack"
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
					<h2 class="font-dm-sans text-base font-bold tracking-wide text-primary uppercase">
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
							class={projectLinkCtaAccentClass}
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
							class={projectLinkCtaNeutralClass}
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
