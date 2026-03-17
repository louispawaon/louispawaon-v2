<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		name,
		introLine,
		description,
		ctaText,
		ctaHref
	}: {
		name: string;
		introLine: string;
		description: string;
		ctaText: string;
		ctaHref: string;
	} = $props();

	const introParts = $derived.by(() => {
		const idx = introLine.indexOf('{name}');
		if (idx === -1) return { before: introLine, after: '' };
		return {
			before: introLine.slice(0, idx),
			after: introLine.slice(idx + '{name}'.length)
		};
	});

	const paragraphs = $derived(description.split('\n').filter((p) => p.trim().length > 0));
</script>

<section class="flex flex-col gap-[34px]">
	<div class="space-y-6">
		<p class="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
			{introParts.before}<span class="font-semibold text-primary">{name}</span>{introParts.after}
		</p>

		{#each paragraphs as paragraph}
			<p class="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
				{paragraph}
			</p>
		{/each}
	</div>

	<a
		href={ctaHref}
		class="inline-flex items-center gap-1.5 text-sm font-light italic text-[#AAAAAA] transition-colors hover:text-primary sm:text-base"
	>
		{ctaText}
		<Icon icon="mdi:arrow-right" class="h-4 w-4" />
	</a>
</section>
