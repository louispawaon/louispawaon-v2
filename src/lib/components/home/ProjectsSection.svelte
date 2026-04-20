<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProjectStackItem from '$lib/components/projects/ProjectStackItem.svelte';
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
	<section id={sectionId} class="flex flex-col gap-section-gap">
		<div class="mx-auto flex w-full max-w-content-max flex-col gap-[34px]">
			<p class="font-['Epilogue'] text-base font-light italic text-subtle-foreground">
				Where my skills and ideas come to life
			</p>
			<ul class="flex w-full list-none flex-col gap-[72px] p-0">
				{#each projects as project (project.slug)}
					<ProjectStackItem {project} />
				{/each}
			</ul>
		</div>

		{#if showCta}
			<a
				href={ctaLink}
				target={ctaIsExternal ? '_blank' : undefined}
				rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
				class="inline-flex items-center gap-1.5 text-sm font-light text-subtle-foreground italic transition-colors hover:text-primary sm:text-base"
			>
				{ctaLabel}
				<Icon icon="mdi:arrow-right" class="h-4 w-4" />
			</a>
		{/if}

		<a
			href={projectsArchiveHref}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-1.5 text-sm font-light text-subtle-foreground italic transition-colors hover:text-primary sm:text-base"
		>
			View my projects archive
			<Icon icon="mdi:arrow-right" class="h-4 w-4" />
		</a>
	</section>
{/if}
