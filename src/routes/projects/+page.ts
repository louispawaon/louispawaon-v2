import { loadAllProjects } from '$lib/utils/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		projects: loadAllProjects(),
		meta: { title: 'Projects — Migs' }
	};
};
