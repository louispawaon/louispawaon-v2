import { fly, type FlyParams } from 'svelte/transition';

function prefersReducedMotion(): boolean {
	return (
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

/** `fly` intro; zero duration when user prefers reduced motion */
export function flyUnlessReduced(node: Element, params: FlyParams) {
	if (prefersReducedMotion()) {
		return { duration: 0 };
	}
	return fly(node, params);
}
