import { SITE_DESCRIPTION, SITE_TITLE } from '$lib/site';
import type { LayoutLoad } from './$types';

export type SiteSettings = {
	sidebarLinks: Array<{ label: string; href: string }>;
	socialLinks: Array<{
		kind: 'github' | 'linkedin' | 'x' | 'twitter' | 'email';
		href: string;
		label?: string;
	}>;
};

const OG_DEFAULT_DESCRIPTION = SITE_DESCRIPTION;

export const load: LayoutLoad = async () => {
	const mod = await import('$lib/content/site/settings.json');
	const settings = (mod as unknown as { default: SiteSettings }).default;

	return {
		settings,
		meta: { title: SITE_TITLE, description: OG_DEFAULT_DESCRIPTION },
		ogDefaultDescription: OG_DEFAULT_DESCRIPTION
	};
};
