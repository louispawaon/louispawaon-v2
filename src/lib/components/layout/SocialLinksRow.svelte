<script lang="ts">
	import Icon from '@iconify/svelte';

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

	function getMdiIconName(kind: SocialKind): string {
		if (kind === 'github') return 'github';
		if (kind === 'linkedin') return 'linkedin';
		if (kind === 'email') return 'email';
		return 'twitter';
	}
</script>

{#if links.length}
	<div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground sm:gap-4">
		{#each links as link}
			{#if link.href}
				{@const mdiName = getMdiIconName(link.kind)}
				<a
					href={link.href}
					class="flex items-center justify-center bg-transparent text-muted-foreground transition-colors hover:text-primary"
					aria-label={link.label ?? link.kind}
					title={link.label ?? link.kind}
					target={link.kind === 'email' ? undefined : '_blank'}
					rel={link.kind === 'email' ? undefined : 'noreferrer'}
				>
			<Icon icon={`mdi:${mdiName}`} class="h-5 w-5 sm:hidden" />
				<Icon icon={`mdi:${mdiName}`} class="hidden h-7 w-7 sm:block" />
				</a>
			{/if}
		{/each}
	</div>
{/if}
