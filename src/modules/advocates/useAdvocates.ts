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

		return advocates.filter((advocate) => {
			return (
				advocate.firstName.includes(query) ||
				advocate.lastName.includes(query) ||
				advocate.city.includes(query) ||
				advocate.degree.includes(query) ||
				advocate.specialties.includes(query) ||
				advocate.yearsOfExperience.toString().includes(query)
			)
		})
	}, [advocates, query])

	return {
		advocates: filteredAdvocates
	}
}
