export type EvaluationResponse = {
	id: string
	title: string
	text: string
	author: EvaluationAuthor
	parent_id?: string
	reply_count: number
	agreements: EvaluationAgreement[]
	essay_point_id: string
	created_at: Date
	agreed: Boolean
	responses: EvaluationResponse[]
	evaluation_result: EvaluationResult
	created_by?: string
	updated_at?: Date
	updated_by?: string
}

export type EvaluationAgreement = {
	created_at: Date
	name: string
	user_id: string
}

export type EvaluationAuthor = {
	name: string
	username: string
	id: string
	avatar_url: string
}

export type EvaluationResult = {
	result: string
	base_grade: number
	criterias: {
		ability_to_conclude_with_coherent_proposals_that_respect_human_rights: {
			description: string
			grade: number
		}
		ability_to_interpret_information: {
			description: string
			grade: number
		}
		domain_of_linguistic_mechanisms_and_argumentation: {
			description: string
			grade: number
		}
		formal_writing: {
			description: string
			grade: number
		}
		theme_comprehension: {
			description: string
			grade: number
		}
	}
}
