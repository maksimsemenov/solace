import { IAdvocate } from 'Types'

export const sortAdvocates = (a: IAdvocate, b: IAdvocate): number => {
	const years = b.yearsOfExperience - a.yearsOfExperience
	if (years) return years

	return a.firstName.localeCompare(b.firstName)
}
