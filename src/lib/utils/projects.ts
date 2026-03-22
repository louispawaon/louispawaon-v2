import { parse as parseYaml } from 'yaml';

export type ProjectEntry = {
	slug: string;
	title: string;
	description: string;
	date: string;
	technologies: string[];
	roles: string[];
	githubUrl?: string;
	demoUrl?: string;
	featured: boolean;
	status?: string;
	featuredImage?: string;
	gallery: string[];
	problem?: string;
	approach?: string;
	engineeringDecisions: string[];
	architecture: string[];
	outcome: string[];
};

function parseFrontmatter(raw: string): Record<string, unknown> | null {
	const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
	if (!match) return null;
	return parseYaml(match[1]) as Record<string, unknown>;
}

function normalizeListField(raw: unknown, objectKey: string): string[] {
	if (!Array.isArray(raw)) return [];
	return raw
		.map((item) => {
			if (typeof item === 'string') return item;
			if (item && typeof item === 'object' && objectKey in item) {
				const v = (item as Record<string, unknown>)[objectKey];
				return typeof v === 'string' ? v : '';
			}
			return '';
		})
		.filter((s) => s.length > 0);
}

/** Gallery from CMS: list of `{ image: url }` or plain strings. */
function normalizeGalleryField(raw: unknown): string[] {
	if (!Array.isArray(raw)) return [];
	return raw
		.map((item) => {
			if (typeof item === 'string') return item;
			if (item && typeof item === 'object' && 'image' in item) {
				const v = (item as Record<string, unknown>).image;
				return typeof v === 'string' ? v : '';
			}
			return '';
		})
		.filter((s) => s.length > 0);
}

function slugFromPath(path: string): string {
	const base = path.split('/').pop() ?? '';
	return base.replace(/\.md$/i, '');
}

function trimFeaturedImage(v: unknown): string | undefined {
	if (typeof v !== 'string') return undefined;
	const t = v.trim();
	return t.length > 0 ? t : undefined;
}

function parseProjectModule(path: string, raw: string): ProjectEntry | null {
	const frontmatter = parseFrontmatter(raw);
	if (!frontmatter) return null;

	const title = (frontmatter.title as string) ?? '';
	const date = (frontmatter.date as string) ?? '';

	return {
		slug: slugFromPath(path),
		title,
		description: (frontmatter.description as string) ?? '',
		date,
		technologies: normalizeListField(frontmatter.technologies, 'technology'),
		roles: normalizeListField(frontmatter.roles, 'role'),
		githubUrl: frontmatter.githubUrl as string | undefined,
		demoUrl: frontmatter.demoUrl as string | undefined,
		featured: Boolean(frontmatter.featured),
		status: frontmatter.status as string | undefined,
		featuredImage: trimFeaturedImage(frontmatter.featuredImage),
		gallery: normalizeGalleryField(frontmatter.gallery),
		problem: optionalText(frontmatter.problem),
		approach: optionalText(frontmatter.approach),
		engineeringDecisions: normalizeListField(frontmatter.engineeringDecisions, 'item'),
		architecture: normalizeListField(frontmatter.architecture, 'item'),
		outcome: normalizeListField(frontmatter.outcome, 'item')
	};
}

function optionalText(v: unknown): string | undefined {
	if (typeof v !== 'string') return undefined;
	const t = v.trim();
	return t.length > 0 ? t : undefined;
}

/** Featured image first, then gallery; omits empty strings. */
export function getCarouselImages(project: ProjectEntry): string[] {
	const out: string[] = [];
	if (project.featuredImage) out.push(project.featuredImage);
	for (const url of project.gallery) {
		if (url && !out.includes(url)) out.push(url);
	}
	return out;
}

export function loadAllProjects(): ProjectEntry[] {
	const modules = import.meta.glob('$lib/content/projects/*.md', {
		query: '?raw',
		eager: true
	}) as Record<string, { default: string }>;

	const entries: ProjectEntry[] = [];

	for (const [path, mod] of Object.entries(modules)) {
		if (path.endsWith('.gitkeep')) continue;
		const entry = parseProjectModule(path, mod.default);
		if (entry) entries.push(entry);
	}

	return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
	return loadAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjectsForHome(limit = 3): ProjectEntry[] {
	return loadAllProjects()
		.filter((p) => p.featured)
		.slice(0, limit);
}

export function rolesForHomepage(project: ProjectEntry): string[] {
	return project.roles.slice(0, 3);
}

/** Stable `view-transition-name` for the project cover (home card ↔ first carousel slide). */
export function projectCoverTransitionName(slug: string): string {
	const safe = slug.replace(/[^a-zA-Z0-9_-]/g, '-');
	return `proj-cover-${safe}`;
}
