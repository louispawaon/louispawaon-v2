import { loadTechStack, type TechStackGroup } from '$lib/utils/tech-stack';
import type { PageServerLoad } from './$types';

export type AboutContent = {
	fullName: string;
	nickname: string;
	introLine: string;
	description: string;
	techStackIntro: string;
};

export type PageLoadData = {
	about: AboutContent;
	techStack: TechStackGroup[];
};

export const load: PageServerLoad = async () => {
	const mod = await import('$lib/content/site/about.json');
	const about = (mod as unknown as { default: AboutContent }).default;
	const techStack = loadTechStack();

	return {
		about,
		techStack,
		meta: { title: 'About — Migs' }
	};
};
