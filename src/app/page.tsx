'use client'

import { useAdvocates } from '@/modules/advocates/useAdvocates'
import { ChangeEvent, useState } from 'react'

export default function Home() {
	const [query, setQuery] = useState('')
	const { advocates } = useAdvocates({ query })

	const onChange = (event: ChangeEvent<HTMLInputElement>) =>
		setQuery(event.target.value)
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
