import { NextRequest } from 'next/server'

import { advocateData } from '../../../db/seed/advocates'
import { filterAdvocates } from '@/modules/utils/filter'

export async function GET(req: NextRequest) {
	// Uncomment this line to use a database
	// const data = await db.select().from(advocates);

	const query = req.nextUrl.searchParams.get('query')
	let data = advocateData

	console.log({ query })

	if (query) {
		data = filterAdvocates(advocateData, query)
	}

	return Response.json({ data: data.sort().slice(0, 15) })
}
