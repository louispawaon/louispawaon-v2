<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		children,
		class: className = ''
	}: {
		children: Snippet;
		class?: string;
	} = $props();

	let el = $state<HTMLElement | null>(null);
	let visible = $state(false);

	$effect(() => {
		const node = el;
		if (typeof window === 'undefined' || !node) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			visible = true;
			return;
		}

		const obs = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visible = true;
						obs.disconnect();
					}
				}
			},
			{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
		);

		obs.observe(node);
		return () => obs.disconnect();
	});
</script>

<div
	bind:this={el}
	class={cn(
		className,
		visible
			? 'animate-in duration-700 fill-mode-forwards slide-in-from-bottom-5 fade-in'
			: 'translate-y-5 opacity-0'
	)}
>
	{@render children()}
</div>
