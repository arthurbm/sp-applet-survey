import { Color } from "@/utils/string-to-color";

export type Position = { row: number; col: number }

export type PointTypeBusiness =
	| 'DIVERGENCE'
	| 'CONVERSATION'
	| 'CONVERGENCE'
	| 'NOTICE'
	| 'ESSAY'
	| 'SUBJECTIVE_QUESTION'
	| 'CHALLENGING_SITUATION'
export type PointTypeUI = 'EMPTY' | 'ADD'
export type PointType = PointTypeUI | PointTypeBusiness

export type Point = {
	id: string
	position: Position
	point_type: PointType
	title?: string
	color: Color
	created_at: string
	visible: boolean
}

export type PointMap = { [key: number | string]: RowMap }

export type RowMap = {
	id: string
	[key: number]: Point
}

export interface ErrorData {
	error: string
	message: string
	path: string
	status: number
	timestamp: string
}
export interface ErrorResponse {
	data: ErrorData
}

export interface NoticePoint extends Point {
	created_at: string
	created_by: string
	description: string
	id: string
	map_id: string
	position: Position
	send_email: boolean
	updated_at: string
	updated_by: string
}
