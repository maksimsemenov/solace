import { useEffect, useMemo, useState } from 'react'
import { IAdvocate } from 'Types'

interface IUseAdvocatesProps {
	query: string
}

interface IUseAdvocates {
	advocates: IAdvocate[]
}

export const useAdvocates = ({ query }: IUseAdvocatesProps): IUseAdvocates => {
	const [advocates, setAdvocates] = useState<IAdvocate[]>([])

	useEffect(() => {
		console.log('fetching advocates...')
		fetch('/api/advocates').then((response) => {
			response.json().then((jsonResponse) => {
				setAdvocates(jsonResponse.data)
			})
		})
	}, [])

	const filteredAdvocates = useMemo(() => {
		if (!query) return advocates

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

		return result.sort((a, b) => {
			const years = b.yearsOfExperience - a.yearsOfExperience
			if (years) return years

			return a.firstName.localeCompare(b.firstName)
		})
	}, [advocates, query])

	return {
		advocates: filteredAdvocates
	}
}
