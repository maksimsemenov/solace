import { IAdvocate } from 'Types'

export const filterAdvocates = (
	advocates: IAdvocate[],
	query: string
): IAdvocate[] => {
	const queryParts = query.toLowerCase().split(/[ -\W]/)
	const result: IAdvocate[] = []

	for (const advocate of advocates) {
		const match = queryParts.every(
			(part) =>
				advocate.firstName.toLowerCase().includes(part) ||
				advocate.lastName.toLowerCase().includes(part) ||
				advocate.city.toLowerCase().includes(part) ||
				advocate.degree.toLowerCase().includes(part) ||
				advocate.specialties.some((s) => s.toLowerCase().includes(part)) ||
				advocate.phoneNumber.toString().includes(part)
		)
		if (match) {
			result.push(advocate)
		}
	}

	return result
}
