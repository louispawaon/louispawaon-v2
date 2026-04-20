/**
 * Shared Tailwind class strings for project surfaces.
 * Corner radii: metadata uses `rounded-sm`; tech pills + repo CTAs use theme `rounded-pill` (6px).
 */

/** Detail header row: type, year, roles, status (neutral). */
export const projectMetadataBadgeNeutralClass =
	'rounded-sm border-transparent bg-surface-raised px-1.5 py-px font-dm-sans text-xs font-bold text-white';

/** Detail header row: status when `ifLive` (accent fill, still `rounded-sm`). */
export const projectMetadataBadgeLiveClass =
	'rounded-sm border-transparent bg-badge-tech px-1.5 py-px font-dm-sans text-xs font-bold text-white';

/** Tech stack chips: /projects index + case-study “Technical decisions” grid. */
export const projectTechPillClass =
	'rounded-pill border-transparent bg-badge-tech px-1.5 py-px font-dm-sans text-xs font-bold text-white';

const projectLinkCtaBase =
	'inline-flex items-center gap-2 rounded-pill border border-transparent px-3 py-1.5 font-dm-sans text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:text-base';

/** Detail page: primary outbound CTA (demo). */
export const projectLinkCtaAccentClass = `${projectLinkCtaBase} bg-badge-tech`;

/** Detail page: secondary outbound CTA (repository). */
export const projectLinkCtaNeutralClass = `${projectLinkCtaBase} bg-surface-raised`;
