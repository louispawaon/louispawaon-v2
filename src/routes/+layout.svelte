<script lang="ts">
	import './layout.css';
	import Icon from '@iconify/svelte';
	import SidebarShell from '$lib/components/layout/SidebarShell.svelte';
	import { page } from '$app/state';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { tick } from 'svelte';
	import { DEFAULT_LOCATION, getCurrentTime } from '$lib/utils';
	import { flyUnlessReduced } from '$lib/utils/motion-transitions';
	import {
		absoluteUrl,
		jsonLd,
		SITE_ALTERNATE_NAMES,
		SITE_NAME,
		SITE_ORIGIN,
		SITE_TITLE
	} from '$lib/site';
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

	$effect(() => {
		footerTime = getCurrentTime();
		const id = setInterval(() => {
			footerTime = getCurrentTime();
		}, 60_000);
		return () => clearInterval(id);
	});

	let {
		data,
		children
	}: {
		data: LayoutData;
		children: any;
	} = $props();

	const documentTitle = $derived(page.data.meta?.title ?? SITE_TITLE);
	const metaDescription = $derived(
		page.data.meta?.description ?? page.data.ogDefaultDescription ?? ''
	);
	const canonicalUrl = $derived(absoluteUrl(page.url.pathname));
	const ogImageUrl = $derived(
		page.data.meta?.ogImage
			? absoluteUrl(page.data.meta.ogImage)
			: `${SITE_ORIGIN}/media/openimage.png`
	);

	const isProjectDetailPage = $derived(/^\/projects\/[^/]+$/.test(page.url.pathname));

	// --- JSON-LD Structured Data ---
	const websiteSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE_ORIGIN}/#website`,
		name: SITE_NAME,
		alternateName: 'Migs Pawaon',
		url: SITE_ORIGIN,
		description: page.data.ogDefaultDescription ?? '',
		inLanguage: 'en',
		publisher: { '@id': `${SITE_ORIGIN}/#person` }
	});

	const personSameAs = $derived(
		data.settings.socialLinks.filter((l) => l.kind !== 'email').map((l) => l.href)
	);

	const personEmail = $derived(
		data.settings.socialLinks.find((l) => l.kind === 'email')?.href.replace('mailto:', '') ?? ''
	);

	const personSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${SITE_ORIGIN}/#person`,
		name: SITE_NAME,
		alternateName: [...SITE_ALTERNATE_NAMES],
		jobTitle: 'Full-Stack Developer',
		url: SITE_ORIGIN,
		image: `${SITE_ORIGIN}/media/openimage.png`,
		sameAs: personSameAs,
		...(personEmail ? { email: personEmail } : {}),
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Davao City',
			addressCountry: 'PH'
		}
	});

	const breadcrumbSchema = $derived.by(() => {
		if (!isProjectDetailPage) return null;
		const projectTitle = (page.data.project as { title: string } | undefined)?.title;
		if (!projectTitle) return null;
		return {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
				{ '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_ORIGIN}/projects` },
				{
					'@type': 'ListItem',
					position: 3,
					name: projectTitle,
					item: `${SITE_ORIGIN}${page.url.pathname}`
				}
			]
		};
	});
	// --- end JSON-LD ---

	const backHref = $derived.by(() => {
		const path = page.url.pathname;
		if (path === '/') return '/';
		if (isProjectDetailPage) {
			return page.url.searchParams.get('from') === 'home' ? '/' : '/projects';
		}
		return '/';
	});
</script>

<svelte:head>
	<title>{documentTitle}</title>
	{#if page.error}
		<meta name="robots" content="noindex" />
	{/if}
	<link rel="canonical" href={canonicalUrl} />
	<meta name="description" content={metaDescription} />
	<meta name="author" content={SITE_NAME} />

	<meta property="og:type" content={isProjectDetailPage ? 'article' : 'website'} />
	<meta property="og:site_name" content="Migs Pawaon" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={documentTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:image" content={ogImageUrl} />
	{#if !page.data.meta?.ogImage}
		<meta property="og:image:width" content="1584" />
		<meta property="og:image:height" content="768" />
		<meta property="og:image:type" content="image/png" />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={documentTitle} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={ogImageUrl} />

	<!-- jsonLd() escapes `<`, so this HTML is generated from our own data. -->
	<!-- eslint-disable svelte/no-at-html-tags -->
	{@html jsonLd(websiteSchema)}
	{@html jsonLd(personSchema)}
	{#if breadcrumbSchema}
		{@html jsonLd(breadcrumbSchema)}
	{/if}
	<!-- eslint-enable svelte/no-at-html-tags -->

	<link rel="icon" href="/migs-font.svg" type="image/svg+xml" />
	<link rel="preload" as="image" href="/migs-font.svg" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="preload"
		as="style"
		href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap"
		onload={(e) => ((e.currentTarget as HTMLLinkElement).rel = 'stylesheet')}
	/>
	<noscript>
		<link
			rel="stylesheet"
			href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap"
		/>
	</noscript>
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	{#if page.error}
		{@render children()}
	{:else}
		<div class="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
			<SidebarShell
				title="Migs Pawaon"
				role="Full-Stack Developer"
				tagline="I make things that make other things easier."
				heroAs={page.url.pathname === '/' ? 'h1' : 'p'}
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
					<div class="mt-section mb-8">
						<a
							href={backHref}
							class="inline-flex items-center gap-1.5 text-sm font-light text-subtle-foreground italic transition-colors hover:text-primary"
						>
							<Icon icon="mdi:arrow-left" class="h-4 w-4" />
							Let's go back
						</a>
					</div>
				{/if}
			</main>
		</div>
	{/if}
</div>
