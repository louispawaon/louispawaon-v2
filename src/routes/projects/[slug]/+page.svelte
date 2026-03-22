<script lang="ts">
	import ProjectImageCarousel from '$lib/components/ProjectImageCarousel.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { flyUnlessReduced } from '$lib/utils/motion-transitions';
	import { rolesForHomepage } from '$lib/utils/projects';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const project = $derived(data.project);
	const carouselImages = $derived(data.carouselImages);

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
				{#if rolesForHomepage(project).length}
					<div class="flex flex-wrap gap-2 sm:justify-end">
						{#each rolesForHomepage(project) as role (role)}
							<Badge
								class="rounded-[6px] border-transparent bg-[#333333] px-2.5 py-0.5 font-['DM_Sans'] text-xs font-bold text-white"
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
		</div>
	{/key}
</div>
