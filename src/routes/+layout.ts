import type { LayoutLoad } from './$types';

export type SiteSettings = {
	sidebarLinks: Array<{ label: string; href: string }>;
	socialLinks: Array<{
		kind: 'github' | 'linkedin' | 'x' | 'twitter' | 'email';
		href: string;
		label?: string;
	}>;
};

const OG_DEFAULT_DESCRIPTION =
	'Full-stack developer building clean, practical web experiences. Based in Davao City, Philippines.';

export const load: LayoutLoad = async () => {
	const mod = await import('$lib/content/site/settings.json');
	const settings = (mod as unknown as { default: SiteSettings }).default;

	return {
		settings,
		meta: { title: 'Migs', description: OG_DEFAULT_DESCRIPTION },
		ogDefaultDescription: OG_DEFAULT_DESCRIPTION
	};
};
