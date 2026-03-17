import { parse as parseYaml } from 'yaml';

export type ExperienceEntry = {
	company: string;
	position: string;
	location?: string;
	startDate: string;
	endDate?: string;
	current?: boolean;
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

function formatMonthYear(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatDatePeriod(entry: ExperienceEntry): string {
	const start = formatMonthYear(entry.startDate);
	if (entry.current) return `${start} - Present`;
	if (!entry.endDate) return start;
	return `${start} - ${formatMonthYear(entry.endDate)}`;
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

		const entry: ExperienceEntry = {
			company: (frontmatter.company as string) ?? '',
			position: (frontmatter.position as string) ?? '',
			location: frontmatter.location as string | undefined,
			startDate: (frontmatter.startDate as string) ?? '',
			endDate: frontmatter.endDate as string | undefined,
			current: frontmatter.current as boolean | undefined,
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
