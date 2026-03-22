<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { projectCoverTransitionName } from '$lib/utils/projects';

	let {
		images,
		imageAltBase = 'Project',
		coverTransitionSlug = null
	}: {
		images: string[];
		imageAltBase?: string;
		/** When set, the first slide image participates in the same view transition as the home project card. */
		coverTransitionSlug?: string | null;
	} = $props();

	const slides = $derived(images.length > 0 ? images : ['']);
	const showControls = $derived(slides.length > 1);
	const slideCount = $derived(slides.length);
	const trackPercent = $derived(slideCount * 100);
	const slideWidthOnTrackPercent = $derived(100 / slideCount);

	let regionEl = $state<HTMLDivElement | null>(null);
	let activeIndex = $state(0);
	const translateXPct = $derived(-activeIndex * slideWidthOnTrackPercent);

	let dragPointerId = $state<number | null>(null);
	let pointerStartX = 0;

	const atStart = $derived(activeIndex <= 0);
	const atEnd = $derived(activeIndex >= slideCount - 1);

	function goTo(index: number) {
		const n = slideCount;
		if (n === 0) return;
		activeIndex = Math.max(0, Math.min(n - 1, index));
	}

	function goPrev() {
		goTo(activeIndex - 1);
	}

	function goNext() {
		goTo(activeIndex + 1);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			goPrev();
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			goNext();
		}
	}

	function onPointerDown(e: PointerEvent) {
		if (e.button !== 0) return;
		dragPointerId = e.pointerId;
		pointerStartX = e.clientX;
		regionEl?.setPointerCapture(e.pointerId);
	}

	function onPointerUp(e: PointerEvent) {
		if (dragPointerId === null || e.pointerId !== dragPointerId) return;
		const dx = e.clientX - pointerStartX;
		const threshold = 48;
		if (dx > threshold) {
			goPrev();
		} else if (dx < -threshold) {
			goNext();
		}
		dragPointerId = null;
		try {
			regionEl?.releasePointerCapture(e.pointerId);
		} catch {
			/* already released */
		}
	}

	function onLostPointerCapture() {
		dragPointerId = null;
	}

	$effect(() => {
		const n = slideCount;
		if (activeIndex >= n) {
			activeIndex = Math.max(0, n - 1);
		}
	});
</script>

<div class="relative">
	{#if showControls}
		<div class="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-start pl-0 sm:w-14">
			<button
				type="button"
				class="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#444444] bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
				aria-label="Previous image"
				disabled={atStart}
				onclick={() => goPrev()}
			>
				<Icon icon="mdi:chevron-left" class="h-6 w-6" />
			</button>
		</div>
		<div class="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-end pr-0 sm:w-14">
			<button
				type="button"
				class="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#444444] bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
				aria-label="Next image"
				disabled={atEnd}
				onclick={() => goNext()}
			>
				<Icon icon="mdi:chevron-right" class="h-6 w-6" />
			</button>
		</div>
	{/if}

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		bind:this={regionEl}
		class="w-full max-w-full cursor-grab overflow-hidden pb-2 active:cursor-grabbing"
		role="region"
		aria-roledescription="carousel"
		aria-label={`${imageAltBase} images`}
		tabindex={showControls ? 0 : -1}
		onkeydown={onKeydown}
		onpointerdown={onPointerDown}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		onlostpointercapture={onLostPointerCapture}
		style="touch-action: pan-y pinch-zoom;"
	>
		<div
			class="flex flex-row transition-transform duration-300 ease-out"
			style:width="{trackPercent}%"
			style:transform="translateX({translateXPct}%)"
		>
			{#each slides as src, i (i)}
				<div
					data-carousel-slide={i}
					class="box-border max-w-full shrink-0"
					style:width="{slideWidthOnTrackPercent}%"
				>
					<Card variant="project" class="w-full max-w-full">
						<CardContent class="px-0">
							<div class="aspect-video w-full overflow-hidden bg-background/30">
								{#if src}
									<img
										src={src}
										alt={`${imageAltBase} — image ${i + 1}`}
										class="pointer-events-none h-full w-full object-cover select-none"
										draggable="false"
										loading={i === 0 ? 'eager' : 'lazy'}
										decoding="async"
										style:view-transition-name={i === 0 && coverTransitionSlug
											? projectCoverTransitionName(coverTransitionSlug)
											: undefined}
									/>
								{/if}
							</div>
						</CardContent>
					</Card>
				</div>
			{/each}
		</div>
	</div>

	{#if slides.length > 1}
		<div class="mt-4 flex flex-wrap items-center justify-center gap-2">
			{#each slides as _, i (i)}
				<button
					type="button"
					class="h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring {activeIndex === i
						? 'w-8 bg-primary'
						: 'w-2 bg-[#444444] hover:bg-[#555555]'}"
					aria-label="Go to image {i + 1}"
					aria-current={activeIndex === i ? 'true' : undefined}
					onclick={() => goTo(i)}
				></button>
			{/each}
		</div>
	{/if}

	{#if showControls}
		<p class="mt-2 text-center text-xs font-light text-[#AAAAAA]">
			Arrows, dots, or swipe — keyboard ← → when focused
		</p>
	{/if}
</div>
