import { loadExperiences, type ExperienceEntryFormatted } from '$lib/utils/experience';
import { getFeaturedProjectsForHome, type ProjectEntry } from '$lib/utils/projects';
import type { PageLoad } from './$types';

export type HomepageContent = {
	name: string;
	introLine: string;
	description: string;
	ctaText: string;
	ctaHref: string;
	experienceCtaText: string;
	experienceCtaHref: string;
	projectsCtaText: string;
	projectsCtaHref: string;
};

export type PageLoadData = {
	homepage: HomepageContent;
	experiences: ExperienceEntryFormatted[];
	featuredProjects: ProjectEntry[];
};

export const load: PageLoad = async () => {
	const mod = await import('$lib/content/site/homepage.json');
	const homepage = (mod as unknown as { default: HomepageContent }).default;
	const experiences = loadExperiences();
	const featuredProjects = getFeaturedProjectsForHome(3);

	return { homepage, experiences, featuredProjects };
};
