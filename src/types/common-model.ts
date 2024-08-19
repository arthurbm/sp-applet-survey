export interface Pageable {
	offset: number
	page_number: number
	page_size: number
	paged: boolean
	sort: Sort
	unpaged: boolean
}

export interface Sort {
	empty: boolean
	sorted: boolean
	unsorted: boolean
}

export type Visibility = 'PRIVATE' | 'PUBLIC'

export type QueryFilter = {
	[key: string]: string | undefined
}

export type PageableResponse<T = unknown> = {
	content: T[]
	total_elements: number
	total_pages: number
	size: number
	empty: boolean
	first: boolean
	last: boolean
	number: number
	number_of_elements: number
	pageable: Pageable
}
