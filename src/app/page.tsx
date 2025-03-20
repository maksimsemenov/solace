'use client'

import { useAdvocates } from '@/modules/advocates/useAdvocates'
import { useSearchParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export default function Home() {
	const searchParams = useSearchParams()
	const [query, setQuery] = useState(searchParams.get('query') || '')
	const { advocates } = useAdvocates({ query })

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newQuery = event.target.value
		setQuery(newQuery)

		// We also want to update the URL query string, so it can be copied and shared
		// However, we don't want to use next router for that: we want to avoid unnecessary
		// re-renders. Also we only use it to set the initial query state on component mount,
		// so we don't realy need it in react life-cycle.
		const urlSarchParams = new URLSearchParams(window.location.search)
		if (newQuery) {
			urlSarchParams.set('query', newQuery)
		} else {
			urlSarchParams.delete('query')
		}
		window.history.replaceState(
			null,
			'',
			`${window.location.pathname}${
				urlSarchParams.size ? `?${urlSarchParams.toString()}` : ''
			}`
		)
	}
	const onClick = () => setQuery('')

	return (
		<main style={{ margin: '24px' }}>
			<h1>Solace Advocates</h1>
			<br />
			<br />
			<div>
				<p>Search</p>
				<p>Searching for: {query}</p>
				<input
					style={{ border: '1px solid black' }}
					onChange={onChange}
					value={query}
				/>
				<button onClick={onClick}>Reset Search</button>
			</div>
			<br />
			<br />
			<table>
				<thead>
					<th>First Name</th>
					<th>Last Name</th>
					<th>City</th>
					<th>Degree</th>
					<th>Specialties</th>
					<th>Years of Experience</th>
					<th>Phone Number</th>
				</thead>
				<tbody>
					{advocates.map((advocate, index) => {
						return (
							<tr key={index}>
								<td>{advocate.firstName}</td>
								<td>{advocate.lastName}</td>
								<td>{advocate.city}</td>
								<td>{advocate.degree}</td>
								<td>
									{advocate.specialties
										.sort((a, b) => a.localeCompare(b))
										.map((s, i) => (
											<div key={i}>{s}</div>
										))}
								</td>
								<td>{advocate.yearsOfExperience}</td>
								<td>{advocate.phoneNumber}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</main>
	)
}
