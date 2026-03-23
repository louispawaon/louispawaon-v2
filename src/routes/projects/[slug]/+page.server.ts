import { error } from '@sveltejs/kit';
import { getCarouselImages, getProjectBySlug, rolesForHomepage } from '$lib/utils/projects';
import type { PageServerLoad } from './$types';

function ogDescription(text: string, max = 160): string {
	const single = text.replace(/\s+/g, ' ').trim();
	if (single.length <= max) return single;
	return `${single.slice(0, max - 1).trimEnd()}…`;
}

export const load: PageServerLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);
	if (!project) {
		error(404, 'Project not found');
	}

	return {
		project,
		displayRoles: rolesForHomepage(project),
		carouselImages: getCarouselImages(project),
		meta: {
			title: `${project.title} — Projects — Migs`,
			description: ogDescription(project.description)
		}
	};
};
