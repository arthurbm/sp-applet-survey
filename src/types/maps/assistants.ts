import { Pageable, Sort } from "../common-model"
import { Comments } from "./comments"

// TODO: move to assistants module
export interface AssistantsResponse {
	content: Assistant[]
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

export interface Assistant {
	id: string
	name: string
	years_old: string
	behavioral_profile: string
	narrative_style: string
	gender: string
	ethnicity: string
	formation: string
	objectives: string
	public?: boolean
	restrictions: string
	guidelines: string
	clarification: string
	specialized_knowledge: string
	instructions?: string
	model_id?: string
}

export type ModelType = 'BASIC' | 'ADVANCED'

export type AssistantComment = Comments
