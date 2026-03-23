<script lang="ts">
	import Icon from '@iconify/svelte';
	import ProjectImageCarousel from '$lib/components/projects/ProjectImageCarousel.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { flyUnlessReduced } from '$lib/utils/motion-transitions';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const project = $derived(data.project);
	const carouselImages = $derived(data.carouselImages);
	const displayRoles = $derived(data.displayRoles);

	const demoHref = $derived((project.demoUrl ?? '').trim());
	const repoHref = $derived((project.githubUrl ?? '').trim());
	const hasProjectLinks = $derived(demoHref.length > 0 || repoHref.length > 0);

	function hasItems(items: string[]): boolean {
		return items.length > 0;
	}
</script>

<div class="flex flex-col">
	<div class="mb-16">
		<ProjectImageCarousel
			images={carouselImages}
			imageAltBase={project.title}
			coverTransitionSlug={project.featuredImage ? project.slug : null}
		/>
	</div>

	{#key project.slug}
		<div
			in:flyUnlessReduced={{ y: 16, duration: 420, delay: 90, opacity: 0 }}
			class="flex flex-col"
		>
			<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
				<h1 class="font-['DM_Sans'] text-2xl font-bold text-white">{project.title}</h1>
			{#if displayRoles.length}
				<div class="flex flex-wrap gap-2 sm:justify-end">
					{#each displayRoles as role (role)}
							<Badge
								class="rounded-sm border-transparent bg-surface-raised px-2.5 py-0.5 font-['DM_Sans'] text-xs font-bold text-white"
							>
								{role}
							</Badge>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div
			in:flyUnlessReduced={{ y: 18, duration: 480, delay: 200, opacity: 0 }}
			class="mt-10 flex flex-col gap-[72px]"
		>
			{#if project.problem}
				<section class="flex flex-col gap-8">
					<h2 class="font-['DM_Sans'] text-2xl font-bold text-white">The Problem</h2>
					<p
						class="font-['Epilogue'] text-lg leading-relaxed whitespace-pre-line text-muted-foreground"
					>
						{project.problem}
					</p>
				</section>
			{/if}

			{#if project.approach}
				<section class="flex flex-col gap-8">
					<h2 class="font-['DM_Sans'] text-2xl font-bold text-white">The Approach</h2>
					<p
						class="font-['Epilogue'] text-lg leading-relaxed whitespace-pre-line text-muted-foreground"
					>
						{project.approach}
					</p>
				</section>
			{/if}

			{#if hasItems(project.engineeringDecisions)}
				<section class="flex flex-col gap-8">
					<h2 class="font-['DM_Sans'] text-2xl font-bold text-white">Engineering Decisions</h2>
					<ul
						class="list-disc space-y-2 pl-5 font-['Epilogue'] text-lg leading-relaxed text-muted-foreground"
					>
						{#each project.engineeringDecisions as item, i (i)}
							<li>{item}</li>
						{/each}
					</ul>
				</section>
			{/if}

			{#if hasItems(project.architecture)}
				<section class="flex flex-col gap-8">
					<h2 class="font-['DM_Sans'] text-2xl font-bold text-white">Architecture</h2>
					<ul
						class="list-disc space-y-2 pl-5 font-['Epilogue'] text-lg leading-relaxed text-muted-foreground"
					>
						{#each project.architecture as item, i (i)}
							<li>{item}</li>
						{/each}
					</ul>
				</section>
			{/if}

			{#if hasItems(project.outcome)}
				<section class="flex flex-col gap-8">
					<h2 class="font-['DM_Sans'] text-2xl font-bold text-white">Outcome</h2>
					<ul
						class="list-disc space-y-2 pl-5 font-['Epilogue'] text-lg leading-relaxed text-muted-foreground"
					>
						{#each project.outcome as item, i (i)}
							<li>{item}</li>
						{/each}
					</ul>
				</section>
			{/if}

			{#if hasProjectLinks}
				<section class="flex flex-col gap-8">
					<h2 class="font-['DM_Sans'] text-2xl font-bold text-white">Links</h2>
					<div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
						{#if demoHref}
							<a
								href={demoHref}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 font-['Epilogue'] text-lg text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
							>
								View live project
								<Icon icon="mdi:open-in-new" class="h-5 w-5 shrink-0 opacity-80" aria-hidden="true" />
							</a>
						{/if}
						{#if repoHref}
							<a
								href={repoHref}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 font-['Epilogue'] text-lg text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
							>
								View repository
								<Icon icon="mdi:open-in-new" class="h-5 w-5 shrink-0 opacity-80" aria-hidden="true" />
							</a>
						{/if}
					</div>
				</section>
			{/if}
		</div>
	{/key}
</div>
