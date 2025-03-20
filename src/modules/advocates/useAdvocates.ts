import { useEffect, useMemo, useState } from 'react'
import { IAdvocate } from 'Types'

interface IUseAdvocatesProps {
	query: string
}

interface IUseAdvocates {
	advocates: IAdvocate[]
	loading: boolean
}

export const useAdvocates = ({ query }: IUseAdvocatesProps): IUseAdvocates => {
	const [loading, setLoading] = useState(true)
	const [advocates, setAdvocates] = useState<IAdvocate[]>([])

	useEffect(() => {
		fetch('/api/advocates')
			.then((response) => {
				response.json().then((jsonResponse) => {
					setAdvocates(jsonResponse.data)
				})
			})
			.finally(() => setLoading(false))
	}, [])

	const filteredAdvocates = useMemo(() => {
		if (!query) return advocates.sort(sortAdvocates)

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

		return result.sort(sortAdvocates)
	}, [advocates, query])

	return {
		advocates: filteredAdvocates,
		loading
	}
}

const sortAdvocates = (a: IAdvocate, b: IAdvocate): number => {
	const years = b.yearsOfExperience - a.yearsOfExperience
	if (years) return years

	return a.firstName.localeCompare(b.firstName)
}
