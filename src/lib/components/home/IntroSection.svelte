<script lang="ts">
	import Icon from '@iconify/svelte';	
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		name,
		introLine,
		description,
		ctaText,
		ctaHref,
		connectEmailHref = '',
		id: sectionId = undefined
	}: {
		name: string;
		introLine: string;
		description: string;
		ctaText: string;
		ctaHref: string;
		connectEmailHref?: string;
		id?: string;
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

	const CONNECT_RE = /\b(connect)\b/g;

	type Segment = { kind: 'text'; text: string } | { kind: 'connect'; text: string };

	function segmentParagraph(paragraph: string): Segment[] {
		const segments: Segment[] = [];
		let last = 0;
		let m: RegExpExecArray | null;
		const re = new RegExp(CONNECT_RE.source, CONNECT_RE.flags);
		while ((m = re.exec(paragraph)) !== null) {
			if (m.index > last) {
				segments.push({ kind: 'text', text: paragraph.slice(last, m.index) });
			}
			segments.push({ kind: 'connect', text: m[1] });
			last = m.index + m[0].length;
		}
		if (last < paragraph.length) {
			segments.push({ kind: 'text', text: paragraph.slice(last) });
		}
		return segments.length > 0 ? segments : [{ kind: 'text', text: paragraph }];
	}

	const emailDisplay = $derived(connectEmailHref.replace(/^mailto:/i, ''));
</script>

<section id={sectionId} class="flex flex-col gap-section-gap">
	<div class="space-y-6">
		<p class="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
			{introParts.before}<span class="font-semibold text-primary">{name}</span>{introParts.after}
		</p>

		{#each paragraphs as paragraph}
			<p class="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
				{#each segmentParagraph(paragraph) as seg}
					{#if seg.kind === 'text'}
						{seg.text}
					{:else if connectEmailHref}
						<Tooltip.Tooltip>
							<Tooltip.TooltipTrigger>
								{#snippet child({ props }: { props: HTMLAttributes<HTMLSpanElement> })}
									<span
										{...props}
										class="cursor-help underline decoration-dotted decoration-2 decoration-primary underline-offset-[0.35em]"
										>{seg.text}</span
									>
								{/snippet}
							</Tooltip.TooltipTrigger>
							<Tooltip.TooltipContent
								side="bottom"
								sideOffset={8}
								class="rounded-sm border border-transparent bg-surface-raised px-2.5 py-0.5 text-xs font-bold text-white"
								arrowClasses="bg-surface-raised fill-surface-raised"
							>
								<a
									href={connectEmailHref}
									class="font-['Epilogue'] text-inherit underline-offset-2 outline-none hover:underline focus-visible:underline"
								>
									{emailDisplay}
								</a>
							</Tooltip.TooltipContent>
						</Tooltip.Tooltip>
					{:else}
						<span
							class="underline decoration-dotted decoration-2 decoration-primary underline-offset-[0.35em]"
							>{seg.text}</span
						>
					{/if}
				{/each}
			</p>
		{/each}
	</div>

	<a
		href={ctaHref}
		class="inline-flex items-center gap-1.5 text-sm font-light text-subtle-foreground italic transition-colors hover:text-primary sm:text-base"
	>
		{ctaText}
		<Icon icon="mdi:arrow-right" class="h-4 w-4" />
	</a>
</section>
