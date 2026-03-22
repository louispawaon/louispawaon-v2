// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			/** Document title; set from route `load` or root layout default. */
			meta?: { title: string };
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
