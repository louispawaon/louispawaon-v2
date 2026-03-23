<script lang="ts">
	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';

	let {
		title,
		role,
		tagline
	}: {
		title: string;
		role: string;
		tagline: string;
	} = $props();
</script>

<section class="space-y-4 sm:space-y-6">
	<h1
		class="flex flex-wrap items-center gap-x-2 gap-y-1 text-4xl leading-[1.05] font-semibold sm:gap-x-3 sm:gap-y-2 sm:text-5xl md:text-6xl lg:text-8xl"
	>
		<span> hi </span>
		<span
			class="inline-flex h-[1em] w-[1em] translate-y-[0.05em] align-middle select-none"
			aria-hidden="true"
		>
			<DotLottieSvelte src="/wave.json" autoplay loop />
		</span>
		<span>,</span>
		<a
			href="/"
			aria-label="Go to home"
			class="inline-flex items-center rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
		>
			<img
				src="/migs-font.svg"
				alt={title}
				class="h-[64px] w-auto max-w-[170px] object-contain sm:h-[80px] sm:max-w-[210px] md:h-[96px] md:max-w-[250px] lg:h-[120px] lg:max-w-[320px]"
			/>
		</a>
		<span>here.</span>
	</h1>

	<p class="text-2xl font-medium text-muted-foreground sm:text-3xl md:text-[36px]">
		{role}
	</p>

	<p class="text-lg font-light text-muted-foreground italic sm:text-xl md:text-[30px]">
		{tagline}
	</p>
</section>
