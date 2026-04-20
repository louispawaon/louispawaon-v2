<script lang="ts">
	let {
		lede = '',
		tone = 'muted',
		class: className = ''
	}: {
		lede?: string;
		tone?: 'muted' | 'foreground';
		class?: string;
	} = $props();

	const text = $derived((lede ?? '').trim());

	const textToneClass = $derived(
		tone === 'foreground' ? 'text-foreground' : 'text-muted-foreground'
	);
</script>

{#if text}
	<div class="flex items-stretch gap-2.5 {className}">
		<div
			class="w-[3px] shrink-0 self-stretch rounded-sm bg-timeline-accent"
			aria-hidden="true"
		></div>
		<p
			class="min-w-0 flex-1 text-pretty font-epilogue text-sm font-light leading-relaxed italic {textToneClass}"
		>
			{text}
		</p>
	</div>
{/if}
