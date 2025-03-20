'use client'

import { useSearchParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

import { useAdvocates } from '@/modules/advocates/useAdvocates'

import styles from './page.module.css'
import { formatPhoneNumber } from '@/utils/phone'
import { pluralize } from '@/utils/pluralize'
import {
	HighlightedContext,
	HighlightedText
} from '@/components/HighlightedText'

export default function Home() {
	const searchParams = useSearchParams()
	const [query, setQuery] = useState(searchParams.get('query') || '')
	const { advocates, loading } = useAdvocates({ query })

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
	const resetSearch = () => setQuery('')

	return (
		<HighlightedContext.Provider value={query}>
			<main className={styles.page}>
				<header>
					<h1>Solace Advocates</h1>
					<div className={styles.search}>
						<input
							placeholder="Search by name, speciality, phone, city..."
							onChange={onChange}
							value={query}
						/>
						{query && (
							<button aria-label="reset search" onClick={resetSearch}>
								×
							</button>
						)}
						{query && !loading && (
							<div className={styles.searchResults}>
								{advocates.length} {pluralize(advocates.length, 'advocate')}
							</div>
						)}
					</div>
				</header>
				<table className={styles.table}>
					<thead>
						<tr>
							<th className={styles.data}>Advocate</th>
							<th>Experience</th>
						</tr>
					</thead>
					<tbody>
						{advocates.map((advocate, index) => {
							return (
								<tr key={index}>
									<td className={styles.data}>
										<div>
											<div className={styles.name}>
												<HighlightedText>
													{`${advocate.firstName} ${advocate.lastName}, ${advocate.degree}`}
												</HighlightedText>
											</div>
											<div className={styles.info}>
												<HighlightedText>
													{`${advocate.city}・${formatPhoneNumber(
														advocate.phoneNumber
													)}`}
												</HighlightedText>
											</div>
											<div className={styles.experience}>
												{`${advocate.yearsOfExperience} ${pluralize(
													advocate.yearsOfExperience,
													'year'
												)}`}
											</div>
										</div>
									</td>
									<td>
										<ul>
											{advocate.specialties
												.sort((a, b) => a.localeCompare(b))
												.map((s, i) => (
													<li key={i}>
														<HighlightedText>{s}</HighlightedText>
													</li>
												))}
										</ul>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</main>
		</HighlightedContext.Provider>
	)
}
