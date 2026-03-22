<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProjectGridCard from '$lib/components/ProjectGridCard.svelte';
	import type { ProjectEntry } from '$lib/utils/projects';

	let {
		projects,
		ctaText,
		ctaHref,
		id: sectionId = undefined
	}: {
		projects: ProjectEntry[];
		ctaText: string;
		ctaHref: string;
		id?: string;
	} = $props();

	const ctaIsExternal = $derived(/^https?:\/\//i.test(ctaHref) || ctaHref.startsWith('//'));
</script>

{#if projects.length}
	<section id={sectionId} class="flex flex-col gap-[34px]">
		<ul
			class="grid list-none grid-cols-1 gap-x-[66px] gap-y-[34px] p-0 sm:grid-cols-2 lg:grid-cols-3"
		>
			{#each projects as project}
				<li class="min-w-0">
					<ProjectGridCard {project} />
				</li>
			{/each}
		</ul>

		<a
			href={ctaHref}
			target={ctaIsExternal ? '_blank' : undefined}
			rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
			class="inline-flex items-center gap-1.5 text-sm font-light text-[#AAAAAA] italic transition-colors hover:text-primary sm:text-base"
		>
			{ctaText}
			<Icon icon="mdi:arrow-right" class="h-4 w-4" />
		</a>
	</section>
{/if}
