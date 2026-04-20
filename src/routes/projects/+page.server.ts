import { groupProjectsByYear, loadAllProjects } from '$lib/utils/projects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const projects = loadAllProjects();
	return {
		yearGroups: groupProjectsByYear(projects),
		meta: {
			title: 'Projects — Migs',
			description: 'Selected work and experiments, grouped by year.'
		}
	};
};
