// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/**
			 * Document title and optional per-route meta description (HTML + Open Graph).
			 * Root layout also sets `ogDefaultDescription` so a page can override only `title`
			 * without losing the site-wide OG description.
			 */
			meta?: { title: string; description?: string };
			ogDefaultDescription?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
