export const pluralize = (
	amount: number,
	singular: string,
	plural?: string
): string => (amount === 1 ? singular : plural ?? `${singular}s`)
