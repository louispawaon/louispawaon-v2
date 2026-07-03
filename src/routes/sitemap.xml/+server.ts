import { loadAllProjects } from '$lib/utils/projects';

export const prerender = true;

export async function GET({ url }) {
	const origin = url.origin;

	type SitemapEntry = {
		loc: string;
		changefreq: string;
		priority: string;
		lastmod?: string;
	};

	const staticRoutes: SitemapEntry[] = [
		{ loc: '/', changefreq: 'monthly', priority: '1.0' },
		{ loc: '/about', changefreq: 'monthly', priority: '0.8' },
		{ loc: '/projects', changefreq: 'weekly', priority: '0.9' }
	];

	const projects = loadAllProjects().filter((p) => p.hasDetailPage !== false);
	const projectRoutes: SitemapEntry[] = projects.map((p) => ({
		loc: `/projects/${p.slug}`,
		changefreq: 'monthly',
		priority: '0.7',
		lastmod: p.date
	}));

	const allRoutes = [...staticRoutes, ...projectRoutes];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(route) => `  <url>
    <loc>${origin}${route.loc}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
