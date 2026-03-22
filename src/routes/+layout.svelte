<script lang="ts">
	import './layout.css';
	import Icon from '@iconify/svelte';
	import SidebarShell from '$lib/components/SidebarShell.svelte';
	import { page } from '$app/state';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { DEFAULT_LOCATION, getCurrentTime } from '$lib/utils';
	import { flyUnlessReduced } from '$lib/utils/motion-transitions';
	import type { LayoutData } from './$types';

	let mainEl = $state<HTMLElement | null>(null);

	function scrollProjectsRouteToTop() {
		const opts = { top: 0, left: 0, behavior: 'instant' as const };
		mainEl?.scrollTo(opts);
		window.scrollTo(opts);
	}

	onNavigate((navigation) => {
		if (typeof document === 'undefined' || !document.startViewTransition) return;

		return new Promise<void>((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
				const path = navigation.to?.url.pathname ?? '';
				if (path.startsWith('/projects')) {
					scrollProjectsRouteToTop();
					await tick();
				}
			});
		});
	});

	/**
	 * `main` is `overflow-y-auto` on md+; SvelteKit only resets `window` scroll, so we also reset `main`.
	 * When View Transitions run, scrolling here again covers timing after the transition snapshot.
	 */
	afterNavigate((navigation) => {
		const path = navigation.to?.url.pathname ?? '';
		if (!path.startsWith('/projects')) return;
		scrollProjectsRouteToTop();
		void tick().then(() => scrollProjectsRouteToTop());
	});

	let footerTime = $state('');
	const footerLocation = DEFAULT_LOCATION;

	onMount(() => {
		const updateTime = () => {
			footerTime = getCurrentTime();
		};

		updateTime();

		const id = setInterval(updateTime, 60_000);
		return () => clearInterval(id);
	});

	let {
		data,
		children
	}: {
		data: LayoutData;
		children: any;
	} = $props();

	const documentTitle = $derived(page.data.meta?.title ?? 'Migs');
	const metaDescription = $derived(
		page.data.meta?.description ?? page.data.ogDefaultDescription ?? ''
	);
	const canonicalUrl = $derived(`${page.url.origin}${page.url.pathname}`);
	const ogImageUrl = $derived(`${page.url.origin}/media/openimage.png`);
</script>

<svelte:head>
	<title>{documentTitle}</title>
	<link rel="canonical" href={canonicalUrl} />
	<meta name="description" content={metaDescription} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={documentTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:width" content="1584" />
	<meta property="og:image:height" content="768" />
	<meta property="og:image:type" content="image/png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={documentTitle} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={ogImageUrl} />

	<link rel="icon" href="/migs-font.svg" type="image/svg+xml" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<div class="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
		<SidebarShell
			title="Migs"
			role="Full-Stack Developer"
			tagline="I make things that make other things easier."
			links={data.settings.sidebarLinks}
			socialLinks={data.settings.socialLinks}
			{footerTime}
			{footerLocation}
		/>

		<main
			bind:this={mainEl}
			in:flyUnlessReduced={{ y: 14, duration: 400, delay: 70, opacity: 0 }}
			class="flex-1 scroll-smooth px-6 pt-10 pb-8 motion-reduce:scroll-auto sm:pt-16 md:h-screen md:overflow-y-auto md:pt-24"
		>
			{@render children()}

			{#if page.url.pathname !== '/'}
				<div class="mt-[135px] mb-8">
					<a
						href="/"
						class="inline-flex items-center gap-1.5 text-sm font-light text-[#AAAAAA] italic transition-colors hover:text-primary"
					>
						<Icon icon="mdi:arrow-left" class="h-4 w-4" />
						Let's go back
					</a>
				</div>
			{/if}
		</main>
	</div>
</div>
