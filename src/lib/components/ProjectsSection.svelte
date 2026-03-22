<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProjectStackItem from '$lib/components/ProjectStackItem.svelte';
	import type { ProjectEntry } from '$lib/utils/projects';

	let {
		projects,
		ctaText,
		ctaHref,
		id: sectionId = undefined
	}: {
		projects: ProjectEntry[];
		ctaText?: string;
		ctaHref?: string;
		id?: string;
	} = $props();

	const ctaLink = $derived((ctaHref ?? '').trim());
	const ctaLabel = $derived((ctaText ?? '').trim());
	const showCta = $derived(Boolean(ctaLabel && ctaLink));
	const ctaIsExternal = $derived(/^https?:\/\//i.test(ctaLink) || ctaLink.startsWith('//'));

	const projectsArchiveHref = 'https://github.com/louispawaon?tab=repositories';
</script>

{#if projects.length}
	<section id={sectionId} class="flex flex-col gap-[34px]">
		<ul class="mx-auto flex w-full max-w-[840px] list-none flex-col gap-12 p-0 md:gap-14">
			{#each projects as project (project.slug)}
				<ProjectStackItem {project} />
			{/each}
		</ul>

		{#if showCta}
			<a
				href={ctaLink}
				target={ctaIsExternal ? '_blank' : undefined}
				rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
				class="inline-flex items-center gap-1.5 text-sm font-light text-[#AAAAAA] italic transition-colors hover:text-primary sm:text-base"
			>
				{ctaLabel}
				<Icon icon="mdi:arrow-right" class="h-4 w-4" />
			</a>
		{/if}

		<a
			href={projectsArchiveHref}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-1.5 text-sm font-light text-[#AAAAAA] italic transition-colors hover:text-primary sm:text-base"
		>
			View my projects archive
			<Icon icon="mdi:arrow-right" class="h-4 w-4" />
		</a>
	</section>
{/if}
