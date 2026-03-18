import { parse as parseYaml } from 'yaml';

export type TechStackItem = {
	name: string;
	category: string;
	icon: string;
};

export type TechStackGroup = {
	category: string;
	items: TechStackItem[];
};

const CATEGORY_ORDER = [
	'Programming Languages',
	'Front-End Development',
	'Back-End Development',
	'Database Management',
	'Developer Tools'
];

function parseFrontmatter(raw: string): Record<string, unknown> | null {
	const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
	if (!match) return null;
	return parseYaml(match[1]) as Record<string, unknown>;
}

export function loadTechStack(): TechStackGroup[] {
	const modules = import.meta.glob('$lib/content/tech-stack/*.md', {
		query: '?raw',
		eager: true
	}) as Record<string, { default: string }>;

	const items: TechStackItem[] = [];

	for (const [path, mod] of Object.entries(modules)) {
		if (path.endsWith('.gitkeep')) continue;
		const frontmatter = parseFrontmatter(mod.default);
		if (!frontmatter) continue;

		items.push({
			name: (frontmatter.name as string) ?? '',
			category: (frontmatter.category as string) ?? '',
			icon: (frontmatter.icon as string) ?? ''
		});
	}

	const grouped = new Map<string, TechStackItem[]>();
	for (const item of items) {
		const list = grouped.get(item.category) ?? [];
		list.push(item);
		grouped.set(item.category, list);
	}

	return CATEGORY_ORDER.filter((cat) => grouped.has(cat)).map((cat) => ({
		category: cat,
		items: grouped.get(cat)!
	}));
}
