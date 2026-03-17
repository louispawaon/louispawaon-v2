<script lang="ts">
	type HeroAction = {
		label: string;
		href: string;
	};

	let {
		actions = []
	}: {
		actions?: HeroAction[];
	} = $props();
</script>

{#if actions.length}
	<nav class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-primary sm:text-sm md:flex-col md:items-end md:gap-[10px] md:text-[20px]">
		{#each actions as action}
			<a href={action.href} class="underline-offset-4 hover:underline">
				{action.label}
			</a>
		{/each}
	</nav>
{/if}

