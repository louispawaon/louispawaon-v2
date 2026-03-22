import { error } from '@sveltejs/kit';
import { getCarouselImages, getProjectBySlug } from '$lib/utils/projects';
import type { PageLoad } from './$types';

function ogDescription(text: string, max = 160): string {
	const single = text.replace(/\s+/g, ' ').trim();
	if (single.length <= max) return single;
	return `${single.slice(0, max - 1).trimEnd()}…`;
}

export const load: PageLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);
	if (!project) {
		error(404, 'Project not found');
	}

	return {
		project,
		carouselImages: getCarouselImages(project),
		meta: {
			title: `${project.title} — Projects — Migs`,
			description: ogDescription(project.description)
		}
	};
};
