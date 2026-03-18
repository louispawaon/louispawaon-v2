<script lang="ts">
	let {
		fullName,
		nickname,
		introLine,
		description
	}: {
		fullName: string;
		nickname: string;
		introLine: string;
		description: string;
	} = $props();

	type IntroSegment = { text: string; highlighted: boolean };

	const introSegments = $derived.by(() => {
		const placeholders: Record<string, string> = {
			'{fullName}': fullName,
			'{nickname}': nickname
		};
		const segments: IntroSegment[] = [];
		let remaining = introLine;

		while (remaining.length > 0) {
			let earliestIdx = -1;
			let earliestKey = '';

			for (const key of Object.keys(placeholders)) {
				const idx = remaining.indexOf(key);
				if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
					earliestIdx = idx;
					earliestKey = key;
				}
			}

			if (earliestIdx === -1) {
				segments.push({ text: remaining, highlighted: false });
				break;
			}

			if (earliestIdx > 0) {
				segments.push({ text: remaining.slice(0, earliestIdx), highlighted: false });
			}
			segments.push({ text: placeholders[earliestKey], highlighted: true });
			remaining = remaining.slice(earliestIdx + earliestKey.length);
		}

		return segments;
	});

	const paragraphs = $derived(description.split('\n').filter((p) => p.trim().length > 0));
</script>

<section class="flex flex-col gap-[34px]">
	<div class="space-y-6">
		<p class="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
			{#each introSegments as segment}
				{#if segment.highlighted}
					<span class="font-semibold text-primary">{segment.text}</span>
				{:else}
					{segment.text}
				{/if}
			{/each}
		</p>

		{#each paragraphs as paragraph}
			<p class="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
				{paragraph}
			</p>
		{/each}
	</div>
</section>
