<script lang="ts">
	import Icon from '@iconify/svelte';

	let { items }: { items: string[] } = $props();
</script>

{#if items.length > 0}
	<div class="rounded-2xl border-2 border-primary bg-timeline-accent p-5">
		<ul class="m-0 flex list-none flex-col gap-3 p-0">
			{#each items as line, i (i)}
				<li class="flex items-start gap-3">
					<Icon
						icon="mdi:arrow-top-right"
						class="mt-0.5 size-5 shrink-0 text-primary"
						aria-hidden="true"
					/>
					<span
						class="min-w-0 flex-1 text-pretty font-['Epilogue'] text-lg leading-relaxed font-medium italic text-muted-foreground"
					>
						{line}
					</span>
				</li>
			{/each}
		</ul>
	</div>
{/if}
