import { Pageable, Sort, Visibility } from "../common-model"

export interface ToolResponse {
	content: Tool[]
	empty: boolean
	first: boolean
	last: boolean
	number: number
	number_of_elements: number
	pageable: Pageable
	size: number
	sort: Sort
	total_elements: number
	total_pages: number
}

export interface Parent {
	author: Author
	id: string
}

export interface Tool {
	color: string
	created_at: string
	created_by: string
	description: string
	id: string
	questions: Question[]
	references: Reference[]
	tier: string
	title: string
	type: string
	updated_at: string
	updated_by: string
	version: number
	visibility: Visibility
	author: Author
	downloads?: number
	parent?: Parent
	template_id: string
}

export interface Author {
	avatar_url?: string
	id?: string
	name?: string
	username: string
}
export interface Question {
	id: string
	question: string
	uuid?: string
}

export interface Reference {
	description: string
	url: string
	id: string
	uuid?: string
}

export interface ToolStatistic {
	agreements_comments_count: number
	color: string
	created_at: string
	id: string
	ied: number
	ief: number
	iep: number
	parent_comments_count: number
	participation: number
	people_active_count: number
	potential: number
	question_count: number
	reply_comments_count: number
	title: string
	total_comments_count: number
}

export interface MapStatistic {
	agreements_comments_count: number
	created_at: string
	divergence_points_count: number
	id: string
	ied: number
	ief: number
	iep: number
	parent_comments_count: number
	participation: number
	people_active_count: number
	potential: number
	question_count: number
	replied_parent_comments_count: number
	reply_comments_count: number
	title: string
	total_comments_count: number
}
