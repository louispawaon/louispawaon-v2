import { parse as parseYaml } from 'yaml';

export type TechStackItem = {
	name: string;
	category: string;
	icon: string;
	order?: number;
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

		const orderRaw = frontmatter.order;
		const order =
			typeof orderRaw === 'number'
				? orderRaw
				: typeof orderRaw === 'string'
					? Number(orderRaw)
					: undefined;

		items.push({
			name: (frontmatter.name as string) ?? '',
			category: (frontmatter.category as string) ?? '',
			icon: (frontmatter.icon as string) ?? '',
			order: Number.isFinite(order) ? order : undefined
		});
	}

	const grouped = new Map<string, TechStackItem[]>();
	for (const item of items) {
		const list = grouped.get(item.category) ?? [];
		list.push(item);
		grouped.set(item.category, list);
	}

	for (const list of grouped.values()) {
		list.sort((a, b) => {
			const ao = a.order ?? Number.POSITIVE_INFINITY;
			const bo = b.order ?? Number.POSITIVE_INFINITY;
			if (ao !== bo) return ao - bo;
			return a.name.localeCompare(b.name);
		});
	}

	return CATEGORY_ORDER.filter((cat) => grouped.has(cat)).map((cat) => ({
		category: cat,
		items: grouped.get(cat)!
	}));
}
