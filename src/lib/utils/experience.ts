import { parse as parseYaml } from 'yaml';

export type ExperienceDateDisplay = 'full' | 'year';

export type ExperienceEntry = {
	company: string;
	position: string;
	location?: string;
	startDate: string;
	endDate?: string;
	current?: boolean;
	/** When true, no date line is shown (start/end still used for ordering). */
	hideDate?: boolean;
	/** `full`: "April 2023"; `year`: "2023" (from ISO start/end dates). */
	dateDisplay?: ExperienceDateDisplay;
	description: string;
	technologies: string[];
	achievements?: string[];
};

export type ExperienceEntryFormatted = ExperienceEntry & {
	datePeriod: string;
};

function parseFrontmatter(raw: string): Record<string, unknown> | null {
	const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
	if (!match) return null;
	return parseYaml(match[1]) as Record<string, unknown>;
}

function yearFromISODate(dateStr: string): string {
	const m = dateStr.match(/^(\d{4})/);
	if (m) return m[1];
	const d = new Date(dateStr);
	return Number.isNaN(d.getTime()) ? '' : String(d.getUTCFullYear());
}

function formatMonthYear(dateStr: string): string {
	const date = new Date(dateStr);
	if (Number.isNaN(date.getTime())) return yearFromISODate(dateStr);
	return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatDateToken(dateStr: string, mode: ExperienceDateDisplay): string {
	return mode === 'year' ? yearFromISODate(dateStr) : formatMonthYear(dateStr);
}

function formatDatePeriod(entry: ExperienceEntry): string {
	if (entry.hideDate) return '';
	const mode: ExperienceDateDisplay = entry.dateDisplay === 'year' ? 'year' : 'full';
	const start = formatDateToken(entry.startDate, mode);
	if (entry.current) return `${start} - Present`;
	if (!entry.endDate) return start;
	return `${start} - ${formatDateToken(entry.endDate, mode)}`;
}

export function loadExperiences(): ExperienceEntryFormatted[] {
	const modules = import.meta.glob('$lib/content/experience/*.md', {
		query: '?raw',
		eager: true
	}) as Record<string, { default: string }>;

	const entries: ExperienceEntryFormatted[] = [];

	for (const [path, mod] of Object.entries(modules)) {
		if (path.endsWith('.gitkeep')) continue;
		const frontmatter = parseFrontmatter(mod.default);
		if (!frontmatter) continue;

		const dateDisplayRaw = frontmatter.dateDisplay as string | undefined;
		const dateDisplay: ExperienceDateDisplay | undefined =
			dateDisplayRaw === 'year' ? 'year' : dateDisplayRaw === 'full' ? 'full' : undefined;

		const entry: ExperienceEntry = {
			company: (frontmatter.company as string) ?? '',
			position: (frontmatter.position as string) ?? '',
			location: frontmatter.location as string | undefined,
			startDate: (frontmatter.startDate as string) ?? '',
			endDate: frontmatter.endDate as string | undefined,
			current: frontmatter.current as boolean | undefined,
			hideDate: frontmatter.hideDate as boolean | undefined,
			dateDisplay,
			description: (frontmatter.description as string) ?? '',
			technologies: (frontmatter.technologies as string[]) ?? [],
			achievements: frontmatter.achievements as string[] | undefined
		};

		entries.push({
			...entry,
			datePeriod: formatDatePeriod(entry)
		});
	}

	return entries.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}
