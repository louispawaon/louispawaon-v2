export const SITE_ORIGIN = 'https://louispawaon.filli.me';
export const SITE_NAME = 'Louis Miguel Pawaon';
export const SITE_ALTERNATE_NAMES = ['Louis Pawaon', 'Migs Pawaon', 'Migs'];
export const SITE_TITLE = 'Louis Pawaon (Migs) — Full-Stack Developer';
export const SITE_DESCRIPTION =
	'Louis Miguel Pawaon, also known as Migs, is a full-stack developer in Davao City, Philippines, building clean, practical web experiences.';

export function absoluteUrl(path: string): string {
	if (/^(https?:)?\/\//i.test(path)) return path;
	return `${SITE_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** JSON-LD as a script tag. `<` is escaped so project content can't break out. */
export function jsonLd(schema: unknown): string {
	const json = JSON.stringify(schema).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</script>`;
}
