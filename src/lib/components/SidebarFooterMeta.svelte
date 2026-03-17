<script lang="ts">
	let {
		currentTime,
		location,
		prefix = "It’s currently",
		connector = "here in",
		class: className = ""
	}: {
		currentTime?: string;
		location?: string;
		prefix?: string;
		connector?: string;
		class?: string;
	} = $props();

	$effect(() => {
		// no-op; ensures currentTime/location are tracked reactively
		currentTime;
		location;
	});
</script>

{#if currentTime || location}
	<p class={`mt-4 text-xs text-muted-foreground ${className}`.trim()}>
		{#if currentTime && location}
			{prefix} <span class="font-medium">{currentTime}</span> {connector}
			<span class="font-medium">{location}</span>.
		{:else if currentTime}
			{prefix} <span class="font-medium">{currentTime}</span>.
		{:else if location}
			Based in <span class="font-medium">{location}</span>.
		{/if}
	</p>
{/if}

