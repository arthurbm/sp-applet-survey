export interface QuestionAnalysis {
	id: string
	summary: string
	roles: {
		motivators: string[]
		critics: string[]
	}
	propositions: string[]
	maturity: {
		rating: number
		quality_of_discussion: string
		mutual_respect: string
		flexibility_and_openness: string
		diversity_of_perspectives: string
		focus_on_topic: string
	}
	outdated: boolean
	created_at: string
}
