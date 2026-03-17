<script lang="ts">
	// Icons are provided by lucide-svelte, which should be installed in the project.
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	import { Github, Linkedin, Mail, Twitter } from '@lucide/svelte';

	type SocialKind = 'github' | 'linkedin' | 'x' | 'twitter' | 'email';

	type SocialLink = {
		kind: SocialKind;
		href: string;
		label?: string;
	};

	let {
		links = []
	}: {
		links?: ReadonlyArray<SocialLink>;
	} = $props();

	function getIcon(kind: SocialKind) {
		if (kind === 'github') return Github;
		if (kind === 'linkedin') return Linkedin;
		if (kind === 'email') return Mail;
		return Twitter;
	}
</script>

{#if links.length}
	<div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground sm:gap-4">
		{#each links as link}
			{#if link.href}
				{@const IconComponent = getIcon(link.kind)}
				<a
					href={link.href}
					class="flex h-10 w-10 items-center justify-center bg-transparent text-muted-foreground transition-colors hover:text-primary sm:h-12 sm:w-12"
					aria-label={link.label ?? link.kind}
					title={link.label ?? link.kind}
					target={link.kind === 'email' ? undefined : '_blank'}
					rel={link.kind === 'email' ? undefined : 'noreferrer'}
				>
					<IconComponent size={20} class="sm:hidden" />
					<IconComponent size={22} class="hidden sm:block" />
				</a>
			{/if}
		{/each}
	</div>
{/if}

