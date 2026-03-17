import type { LayoutLoad } from './$types';

export type SiteSettings = {
	sidebarLinks: Array<{ label: string; href: string }>;
	socialLinks: Array<{
		kind: 'github' | 'linkedin' | 'x' | 'twitter' | 'email';
		href: string;
		label?: string;
	}>;
};

export const load: LayoutLoad = async () => {
	const mod = await import('$lib/content/site/settings.json');
	const settings = (mod as unknown as { default: SiteSettings }).default;

	return {
		settings
	};
};
