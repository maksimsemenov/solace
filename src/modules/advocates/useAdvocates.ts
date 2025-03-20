import { useEffect, useMemo, useState } from 'react'
import { keyBy, throttle } from 'lodash'

import { sortAdvocates } from '../utils/sort'
import { filterAdvocates } from '../utils/filter'

import { IAdvocate } from 'Types'

interface IUseAdvocatesProps {
	query: string
}

interface IUseAdvocates {
	advocates: IAdvocate[]
	loading: boolean
}

const throttledFetch = throttle(
	(...args: Parameters<typeof fetch>) =>
		fetch(...args).then((response) => response.json()),
	300
)

export const useAdvocates = ({ query }: IUseAdvocatesProps): IUseAdvocates => {
	const [loading, setLoading] = useState(false)
	const [advocates, setAdvocates] = useState<Record<string, IAdvocate>>({})

	useEffect(() => {
		setLoading(true)
		// We want to optimize load on our server (and save a bit traffic for the user)
		// so we thrttle requests, to not query dat aon each key press.
		// But, to provide a more real-time feed back for the user, we still filter
		// client-side cache of advocates on each key press.
		throttledFetch(`/api/advocates${query ? `?query=${query}` : ''}`)
			.then((response) => {
				setAdvocates((_advocates) => ({
					..._advocates,
					...keyBy(response.data, 'id')
				}))
			})
			.finally(() => setLoading(false))
	}, [query])

	const filteredAdvocates = useMemo(() => {
		const advocatesList = Object.values(advocates)
		if (!query) return advocatesList.sort(sortAdvocates)

		return filterAdvocates(advocatesList, query).sort(sortAdvocates)
	}, [advocates, query])

	return {
		advocates: filteredAdvocates,
		loading
	}
}
