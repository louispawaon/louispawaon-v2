import { groupProjectsByYear, loadAllProjects } from '$lib/utils/projects';
import type { PageServerLoad } from './$types';

const EMPTY_DESCRIPTION = 'Selected work and experiments, grouped by year.';

function buildMetaDescription(total: number, yearGroupCount: number): string {
	if (total === 0) return EMPTY_DESCRIPTION;
	const yearLabel = yearGroupCount === 1 ? 'year' : 'years';
	const projectLabel = total === 1 ? 'project' : 'projects';
	const base = `${total} ${projectLabel} across ${yearGroupCount} ${yearLabel} — selected work and experiments.`;
	if (base.length <= 160) return base;
	return `${base.slice(0, 157).trimEnd()}…`;
}

export const load: PageServerLoad = () => {
	const projects = loadAllProjects();
	const yearGroups = groupProjectsByYear(projects);
	const description = buildMetaDescription(projects.length, yearGroups.length);

	return {
		yearGroups,
		meta: {
			title: 'Projects — Migs',
			description
		}
	};
};
