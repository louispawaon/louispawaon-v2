<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';

	export const cardVariants = tv({
		base: 'flex flex-col text-card-foreground',
		variants: {
			variant: {
				default: 'gap-6 rounded-xl border border-border bg-card py-6 shadow-sm',
				project:
					'gap-0 overflow-hidden rounded-3xl border border-border-visible bg-transparent py-0 shadow-none'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	export type CardVariant = VariantProps<typeof cardVariants>['variant'];
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: CardVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-variant={variant}
	class={cn(cardVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
