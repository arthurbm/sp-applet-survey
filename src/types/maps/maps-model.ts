
import { Author } from './comments'
import { Point } from './map-canvas'
import { Question, Reference } from './tool-model'

export interface Map {
	id: string
	project_id: string
	title: string
	points: Point[]
	created_at: string
}

export interface MapOrderType {
	map_id: string
	new_map_position: number
}

export interface DivergencePointMapView {
	divergencePointId: string
	generalData: GeneralData
	answers: AnswersAndComments[]
	questionsAndAnswers: QuestionsAndAnswers[]
}

export interface GeneralData {
	attached_links: AttachedLinks[]
	tool: ToolDivergencePoint
	created_at: string
	created_by: string
	id: string
	map_id: string
	position: PointPosition
	updated_at: string
	updated_by: string
	incognito_mode: boolean
	approved: boolean | null
	introduction: string | null
}

export interface ToolDivergencePoint {
	color: string
	created_at: string
	created_by: string
	description: string
	id: string
	questions: Question[]
	references: Reference[]
	title: string
	updated_at: string
	updated_by: string
}

export interface AttachedLinks {
	author: Author
	id: string
	title: string
	url: string
}

export interface PointPosition {
	col: number
	row: number
}

export interface AnswersAndComments {
	id: string
	comments: CommentsType[]
}
export interface CommentsType {
	active: boolean
	agreements: Agreements[]
	author: Author
	created_at: string
	created_by: string
	divergence_point_id: string
	id: string
	parent_id: string
	question_id: string
	replies: CommentsType[]
	reply_count: number
	text: string
	updated_at: string
	updated_by: string
	version: number
}
export interface Agreements {
	created_at: string
	user_id: string
}
export interface PointsCount {
	conversation_points: number
	divergence_points: number
	convergence_points: number
}

export interface QuestionsAndAnswers {
	id: string
	question: string
	comments: CommentsType[]
}
