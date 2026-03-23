<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { TechStackGroup } from '$lib/utils/tech-stack';

	let {
		intro,
		groups
	}: {
		intro: string;
		groups: TechStackGroup[];
	} = $props();
</script>

<section class="flex flex-col gap-12">
	<p class="text-base font-light italic text-subtle-foreground">
		{intro}
	</p>

	<div class="flex flex-col gap-10">
		{#each groups as group}
			<div>
				<h3 class="text-2xl font-bold">{group.category}</h3>

				<div class="mt-6 grid grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] gap-8">
					{#each group.items as item}
						<div class="flex flex-col items-center gap-2">
							<Icon icon={item.icon} class="h-12 w-12" />
							<span class="text-base font-light italic text-subtle-foreground">{item.name}</span>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
