import { loadExperiences, type ExperienceEntryFormatted } from '$lib/utils/experience';
import type { PageLoad } from './$types';

export type HomepageContent = {
	name: string;
	introLine: string;
	description: string;
	ctaText: string;
	ctaHref: string;
	experienceCtaText: string;
	experienceCtaHref: string;
};

export type PageLoadData = {
	homepage: HomepageContent;
	experiences: ExperienceEntryFormatted[];
};

export const load: PageLoad = async () => {
	const mod = await import('$lib/content/site/homepage.json');
	const homepage = (mod as unknown as { default: HomepageContent }).default;
	const experiences = loadExperiences();

	return { homepage, experiences };
};
