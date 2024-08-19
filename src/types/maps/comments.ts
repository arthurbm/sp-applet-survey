import { Tool } from "./tool-model"

export type QuestionWithComments = {
	id: string
	comments: Comments[]
}

export type Reply = {
	author: Author
	id: string
	parent_id: string
	text: string
	created_at: Date
	agreements: Agreement[]
	question_id: string
	created_by: string
}

export interface DislikeComment {
	comment_id: string
	question_id: string
	user_id: string
	parent_id?: string
}

export interface LikeComment extends DislikeComment {
	user_name?: string
}

interface QuestionFull extends QuestionWithComments {
	count: number
}

interface QuestionCount {
	id: string
	question: string
	total_comments_count: number
	parent_comments_count: number
	reply_comments_count: number
}

export type Comments = {
	author: Author
	divergence_point_id: string
	id: string
	parent_id: string
	question_id: string
	reply_count: number
	text: string
	created_at: Date
	agreed: boolean
	agreements: Agreement[]
	replies: Reply[]
	created_by: string
}

export type Author = {
	avatar_url: string
	avatarUrl: string
	id: string
	name: string
	username: string
	is_assistant: boolean
}

export type Agreement = {
	created_at: Date
	name: string
	user_id: string
}

type Links = {
	author: Author
	id: string
	title: string
	url: string
}

export type PointInfos = {
	attached_links: Links[]
	created_at: string
	id: string
	introduction: string
	tool: Tool
}