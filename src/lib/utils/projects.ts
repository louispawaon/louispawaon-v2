import { parse as parseYaml } from 'yaml';

export type ProjectNarrativeBlock = {
	context: string;
	subcontext?: string;
};

export type ProjectType = 'assessment' | 'personal' | 'company' | 'org';

const PROJECT_TYPES = new Set<ProjectType>(['assessment', 'personal', 'company', 'org']);

export type ProjectEntry = {
	slug: string;
	title: string;
	description: string;
	lede?: string;
	projectType?: ProjectType;
	clientName?: string;
	previewProblem?: string;
	previewOutcome?: string;
	date: string;
	technologies: string[];
	roles: string[];
	githubUrl?: string;
	demoUrl?: string;
	featured: boolean;
	status?: string;
	/** When true, the project detail page uses the accent (blue) style for the status pill. */
	ifLive?: boolean;
	/** When true, `/projects` index shows Private and hides outbound demo/repo links. */
	underNda?: boolean;
	/** When false, project appears on `/projects` index only and `/projects/[slug]` should 404. */
	hasDetailPage: boolean;
	featuredImage?: string;
	gallery: string[];
	problem?: ProjectNarrativeBlock;
	approach?: ProjectNarrativeBlock;
	technicalDecisions?: ProjectNarrativeBlock;
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

/**
 * Ensures images load from the site root (`static/` → served as `/...`).
 * Relative paths like `media/projects/foo.png` resolve as `/projects/media/...` on
 * `/projects/[slug]`; this normalizes them to `/media/projects/foo.png`.
 */
function normalizeProjectImageUrl(url: string): string {
	const t = url.trim();
	if (!t) return t;
	if (/^https?:\/\//i.test(t) || t.startsWith('//')) return t;
	if (t.startsWith('/')) return t;
	// Repo-relative paths sometimes saved by CMS
	if (t.startsWith('static/')) return `/${t.slice('static/'.length)}`;
	// Public URL without leading slash (common from Decap/Sveltia)
	if (t.startsWith('media/')) return `/${t}`;
	// Strip leading ./ then root-absolute
	const noDot = t.replace(/^\.\//, '');
	return `/${noDot}`;
}

function trimFeaturedImage(v: unknown): string | undefined {
	if (typeof v !== 'string') return undefined;
	const t = v.trim();
	return t.length > 0 ? t : undefined;
}

function optionalText(v: unknown): string | undefined {
	if (typeof v !== 'string') return undefined;
	const t = v.trim();
	return t.length > 0 ? t : undefined;
}

function parseProjectType(raw: unknown): ProjectType | undefined {
	if (typeof raw !== 'string') return undefined;
	const t = raw.trim() as ProjectType;
	return PROJECT_TYPES.has(t) ? t : undefined;
}

export function formatProjectTypeDisplay(t: ProjectType | undefined): string | undefined {
	if (!t) return undefined;
	return t.charAt(0).toUpperCase() + t.slice(1);
}

/** Calendar year from `project.date` (ISO `YYYY-MM-DD`), or `undefined` if unparsable. */
export function projectDisplayYear(project: ProjectEntry): string | undefined {
	const d = new Date(project.date);
	if (!Number.isFinite(d.getTime())) return undefined;
	return String(d.getFullYear());
}

export type ProjectYearGroup = {
	year: string;
	projects: ProjectEntry[];
};

/** Groups already-sorted projects (e.g. from `loadAllProjects()`) by calendar year, newest years first. */
export function groupProjectsByYear(projects: ProjectEntry[]): ProjectYearGroup[] {
	const map = new Map<string, ProjectEntry[]>();
	for (const p of projects) {
		const y = projectDisplayYear(p) ?? 'Unknown';
		const list = map.get(y);
		if (list) list.push(p);
		else map.set(y, [p]);
	}

	const years = [...map.keys()].sort((a, b) => {
		if (a === 'Unknown') return 1;
		if (b === 'Unknown') return -1;
		return Number(b) - Number(a);
	});

	return years.map((year) => ({ year, projects: map.get(year)! }));
}

export type ProjectIndexAction =
	| { kind: 'link'; label: 'Live' | 'Github'; href: string }
	| { kind: 'static'; label: 'Private' };

/**
 * Outbound action for `/projects` index: Live (demo), Github, or Private (NDA or no URL).
 */
export function projectIndexAction(project: ProjectEntry): ProjectIndexAction {
	if (project.underNda === true) {
		return { kind: 'static', label: 'Private' };
	}
	const demo = typeof project.demoUrl === 'string' ? project.demoUrl.trim() : '';
	const gh = typeof project.githubUrl === 'string' ? project.githubUrl.trim() : '';
	if (project.ifLive === true && demo.length > 0) {
		return { kind: 'link', label: 'Live', href: demo };
	}
	if (gh.length > 0) {
		return { kind: 'link', label: 'Github', href: gh };
	}
	return { kind: 'static', label: 'Private' };
}

/** Subtitle line: `{ProjectType} · {client}` with sensible fallbacks. */
export function projectIndexSubtitle(project: ProjectEntry): string {
	const type = formatProjectTypeDisplay(project.projectType);
	const client = project.clientName?.trim();
	if (type && client) return `${type} · ${client}`;
	if (type) return type;
	if (client) return client;
	return '';
}

/**
 * Accepts legacy plain string or `{ context, subcontext }` from YAML/CMS.
 */
function parseNarrativeBlock(raw: unknown): ProjectNarrativeBlock | undefined {
	if (raw == null) return undefined;
	if (typeof raw === 'string') {
		const t = raw.trim();
		return t.length > 0 ? { context: t } : undefined;
	}
	if (typeof raw === 'object' && !Array.isArray(raw)) {
		const o = raw as Record<string, unknown>;
		const context = typeof o.context === 'string' ? o.context.trim() : '';
		const subRaw = o.subcontext;
		const subcontext =
			typeof subRaw === 'string' && subRaw.trim().length > 0 ? subRaw.trim() : undefined;
		if (!context) return undefined;
		return { context, subcontext };
	}
	return undefined;
}

/** Merge removed `engineeringDecisions` + `architecture` list fields into one narrative block. */
function legacyEngineeringArchitectureToBlock(
	engineering: string[],
	architecture: string[]
): ProjectNarrativeBlock | undefined {
	const all = [...engineering, ...architecture].map((s) => s.trim()).filter((s) => s.length > 0);
	if (all.length === 0) return undefined;
	const [first, ...rest] = all;
	const sub = rest.join('\n');
	return { context: first, subcontext: sub.length > 0 ? sub : undefined };
}

/** Plain text for current templates (context + optional subcontext). */
export function narrativeAsPlainText(block: ProjectNarrativeBlock | undefined): string | undefined {
	if (!block?.context?.trim()) return undefined;
	const ctx = block.context.trim();
	const sub = block.subcontext?.trim();
	return sub ? `${ctx}\n\n${sub}` : ctx;
}

/**
 * Maps the merged technical-decisions narrative onto the two legacy list fields
 * so the existing project page can show one combined list under Engineering and skip Architecture when empty.
 */
export function technicalDecisionsAsLegacyLists(block: ProjectNarrativeBlock | undefined): {
	engineeringDecisions: string[];
	architecture: string[];
} {
	if (!block?.context?.trim()) {
		return { engineeringDecisions: [], architecture: [] };
	}
	const lines: string[] = [block.context.trim()];
	const sub = block.subcontext?.trim();
	if (sub) {
		for (const line of sub.split(/\n+/)) {
			const t = line.trim();
			if (t.length > 0) lines.push(t);
		}
	}
	return { engineeringDecisions: lines, architecture: [] };
}

function parseProjectModule(path: string, raw: string): ProjectEntry | null {
	const frontmatter = parseFrontmatter(raw);
	if (!frontmatter) return null;

	const title = (frontmatter.title as string) ?? '';
	const date = (frontmatter.date as string) ?? '';

	const rawFeatured = trimFeaturedImage(frontmatter.featuredImage);
	const featuredImage = rawFeatured ? normalizeProjectImageUrl(rawFeatured) : undefined;
	const gallery = normalizeGalleryField(frontmatter.gallery).map(normalizeProjectImageUrl);

	let technicalDecisions = parseNarrativeBlock(frontmatter.technicalDecisions);
	if (!technicalDecisions) {
		const eng = normalizeListField(frontmatter.engineeringDecisions, 'item');
		const arch = normalizeListField(frontmatter.architecture, 'item');
		technicalDecisions = legacyEngineeringArchitectureToBlock(eng, arch);
	}

	const problem = parseNarrativeBlock(frontmatter.problem);
	const approach = parseNarrativeBlock(frontmatter.approach);

	return {
		slug: slugFromPath(path),
		title,
		description: optionalText(frontmatter.description) ?? '',
		lede: optionalText(frontmatter.lede),
		projectType: parseProjectType(frontmatter.projectType),
		clientName: optionalText(frontmatter.clientName),
		previewProblem: optionalText(frontmatter.previewProblem),
		previewOutcome: optionalText(frontmatter.previewOutcome),
		date,
		technologies: normalizeListField(frontmatter.technologies, 'technology'),
		roles: normalizeListField(frontmatter.roles, 'role'),
		githubUrl: frontmatter.githubUrl as string | undefined,
		demoUrl: frontmatter.demoUrl as string | undefined,
		featured: Boolean(frontmatter.featured),
		status: frontmatter.status as string | undefined,
		ifLive: frontmatter.ifLive === true,
		underNda: frontmatter.underNda === true,
		hasDetailPage: frontmatter.hasDetailPage !== false,
		featuredImage,
		gallery,
		problem,
		approach,
		technicalDecisions,
		outcome: normalizeListField(frontmatter.outcome, 'item')
	};
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
