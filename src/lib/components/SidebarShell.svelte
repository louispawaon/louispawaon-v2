<script lang="ts">
	import SidebarFooterMeta from '$lib/components/SidebarFooterMeta.svelte';
	import HeroActions from '$lib/components/HeroActions.svelte';
	import HeroGreeting from '$lib/components/HeroGreeting.svelte';
	import SocialLinksRow from '$lib/components/SocialLinksRow.svelte';

	type SidebarLink = {
		label: string;
		href: string;
	};

	let {
		title,
		role,
		tagline,
		links = [],
		footerTime,
		footerLocation,
		socialLinks = []
	}: {
		title: string;
		role: string;
		tagline: string;
		links?: SidebarLink[];
		footerTime?: string;
		footerLocation?: string;
		socialLinks?: ReadonlyArray<{
			kind: 'github' | 'linkedin' | 'x' | 'twitter' | 'email';
			href: string;
			label?: string;
		}>;
	} = $props();
</script>

<aside
	class="border-b border-border px-6 pt-10 pb-10 sm:px-10 sm:pt-16 sm:pl-12 md:h-screen md:flex-none md:basis-1/2 md:self-start md:border-b-0 md:pt-24 md:pl-20"
>
	<div class="flex h-full flex-col justify-between gap-10">
		<HeroGreeting {title} {role} {tagline} />

		<div class="space-y-4">
			{#if links.length}
				<div class="flex justify-start md:justify-end">
					<HeroActions actions={links} />
				</div>
			{/if}

			<SocialLinksRow links={socialLinks} />

			<SidebarFooterMeta currentTime={footerTime} location={footerLocation} />
		</div>
	</div>
</aside>
