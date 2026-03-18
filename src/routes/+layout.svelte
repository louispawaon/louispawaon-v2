<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Icon from '@iconify/svelte';
	import SidebarShell from '$lib/components/SidebarShell.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { DEFAULT_LOCATION, getCurrentTime } from '$lib/utils';
	import type { LayoutData } from './$types';

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
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
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

		<main class="flex-1 px-6 pt-10 pb-8 sm:pt-16 md:h-screen md:overflow-y-auto md:pt-24">
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
