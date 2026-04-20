<script lang="ts">
	import Icon from '@iconify/svelte';
	import { projectCoverTransitionName } from '$lib/utils/projects';

	let {
		images,
		imageAltBase = 'Project',
		coverTransitionSlug = null
	}: {
		images: string[];
		imageAltBase?: string;
		coverTransitionSlug?: string | null;
	} = $props();

	const slides = $derived(images.length > 0 ? images : ['']);
	const showControls = $derived(slides.length > 1);
	const slideCount = $derived(slides.length);

	let stripEl = $state<HTMLDivElement | null>(null);
	let activeIndex = $state(0);
	let lightboxIndex = $state<number | null>(null);

	const atStart = $derived(activeIndex <= 0);
	const atEnd = $derived(activeIndex >= slideCount - 1);

	function scrollSlideIntoView(index: number) {
		const root = stripEl;
		if (!root) return;
		const el = root.querySelector<HTMLElement>(`[data-carousel-slide="${index}"]`);
		el?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
	}

	function goTo(index: number) {
		const n = slideCount;
		if (n === 0) return;
		const next = Math.max(0, Math.min(n - 1, index));
		activeIndex = next;
		scrollSlideIntoView(next);
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

	function openLightbox(index: number) {
		lightboxIndex = index;
	}

	function closeLightbox() {
		lightboxIndex = null;
	}

	function onWindowKeydown(e: KeyboardEvent) {
		if (lightboxIndex == null) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			closeLightbox();
			return;
		}
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			lightboxIndex = Math.max(0, activeIndex - 1);
			goPrev();
			return;
		}
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			lightboxIndex = Math.min(slideCount - 1, activeIndex + 1);
			goNext();
		}
	}

	function onStripScroll() {
		const root = stripEl;
		if (!root || slideCount <= 1) return;
		const first = root.querySelector<HTMLElement>('[data-carousel-slide="0"]');
		if (!first) return;
		const stride = first.offsetWidth + 16;
		if (stride <= 0) return;
		const i = Math.round(root.scrollLeft / stride);
		activeIndex = Math.max(0, Math.min(slideCount - 1, i));
	}

	$effect(() => {
		const n = slideCount;
		if (activeIndex >= n) {
			activeIndex = Math.max(0, n - 1);
		}
	});
</script>

<svelte:window onkeydown={onWindowKeydown} />

<div class="relative w-full min-w-0 max-w-full">
	{#if showControls}
		<div
			class="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-start pl-0 sm:w-14"
		>
			<button
				type="button"
				class="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border-visible bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
				aria-label="Previous image"
				disabled={atStart}
				onclick={() => goPrev()}
			>
				<Icon icon="mdi:chevron-left" class="h-6 w-6" />
			</button>
		</div>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-end pr-0 sm:w-14"
		>
			<button
				type="button"
				class="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border-visible bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
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
		bind:this={stripEl}
		class="flex min-w-0 cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-2 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
		role="region"
		aria-roledescription="carousel"
		aria-label={`${imageAltBase} images`}
		tabindex={showControls ? 0 : -1}
		onkeydown={onKeydown}
		onscroll={onStripScroll}
		style="touch-action: pan-x pinch-zoom;"
	>
		{#each slides as src, i (i)}
			<div
				data-carousel-slide={i}
				class="aspect-video w-full max-w-full shrink-0 snap-start overflow-hidden rounded-[25px] border border-border-visible bg-background/30 md:w-[415px] md:max-w-[415px]"
			>
				{#if src}
					<button
						type="button"
						class="block h-full w-full"
						aria-label={`Open ${imageAltBase} image ${i + 1} fullscreen`}
						onclick={() => openLightbox(i)}
					>
						<img
							src={src}
							alt={`${imageAltBase} — image ${i + 1}`}
							class="pointer-events-none h-full w-full object-contain select-none"
							draggable="false"
							loading={i === 0 ? 'eager' : 'lazy'}
							decoding="async"
							style:view-transition-name={i === 0 && coverTransitionSlug
								? projectCoverTransitionName(coverTransitionSlug)
								: undefined}
						/>
					</button>
				{/if}
			</div>
		{/each}
	</div>

	{#if slides.length > 1}
		<div class="mt-4 flex flex-wrap items-center justify-center gap-2">
			{#each slides as _, i (i)}
				<button
					type="button"
					class="h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring {activeIndex === i
						? 'w-8 bg-primary'
						: 'w-2 bg-border-visible hover:bg-muted-foreground'}"
					aria-label="Go to image {i + 1}"
					aria-current={activeIndex === i ? 'true' : undefined}
					onclick={() => goTo(i)}
				></button>
			{/each}
		</div>
	{/if}

	{#if showControls}
		<p class="mt-2 text-center text-xs font-light text-subtle-foreground">
			Scroll or use arrows — keyboard ← → when focused. Click image to view full size.
		</p>
	{/if}
</div>

{#if lightboxIndex !== null}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
		role="dialog"
		aria-modal="true"
		aria-label={`${imageAltBase} fullscreen image viewer`}
		tabindex="-1"
		onclick={(e) => {
			if (e.currentTarget === e.target) closeLightbox();
		}}
		onkeydown={(e) => {
			if (e.currentTarget === e.target && (e.key === 'Enter' || e.key === ' ')) {
				e.preventDefault();
				closeLightbox();
			}
		}}
	>
		<button
			type="button"
			class="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition-colors hover:border-white hover:bg-black/70"
			aria-label="Close fullscreen image"
			onclick={closeLightbox}
		>
			<Icon icon="mdi:close" class="h-5 w-5" />
		</button>

		{#if showControls}
			<div class="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-14 items-center justify-start pl-2">
				<button
					type="button"
					class="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white transition-colors hover:border-white hover:bg-black/80 disabled:pointer-events-none disabled:opacity-30"
					aria-label="Previous fullscreen image"
					disabled={atStart}
					onclick={() => {
						lightboxIndex = Math.max(0, activeIndex - 1);
						goPrev();
					}}
				>
					<Icon icon="mdi:chevron-left" class="h-6 w-6" />
				</button>
			</div>

			<div class="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-end pr-2">
				<button
					type="button"
					class="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white transition-colors hover:border-white hover:bg-black/80 disabled:pointer-events-none disabled:opacity-30"
					aria-label="Next fullscreen image"
					disabled={atEnd}
					onclick={() => {
						lightboxIndex = Math.min(slideCount - 1, activeIndex + 1);
						goNext();
					}}
				>
					<Icon icon="mdi:chevron-right" class="h-6 w-6" />
				</button>
			</div>
		{/if}

		<img
			src={slides[lightboxIndex]}
			alt={`${imageAltBase} — image ${lightboxIndex + 1}`}
			class="max-h-[92vh] max-w-[96vw] object-contain"
			decoding="async"
		/>
	</div>
{/if}
