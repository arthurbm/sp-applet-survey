import { Pageable, Sort } from 'modules/common/types'

type PlanItem = {
	text: 'string'
	hasCredit: boolean
}

export type PlanInfos = {
	title: string
	description: string
	value?: string
	valueDescription?: string
	itens: PlanItem[]
	notes: string[]
	color: string
	level: number
	type: PlanNames
	teamSize: number
	price?: number
	credits?: number
}

export type PlanNames =
	| 'BASIC'
	| 'PRO'
	| 'TEAM'
	| 'BUSINESS'
	| 'COMPANY'
	| 'ENTERPRISE'
	| 'ECOSYSTEM'
	| 'CUSTOM'

export interface Subscription {
	id: string
	status: string
	user: User
	subscription_id: string
	links: Link[]
	plan_type: string
	subscriber: Subscriber
	billing_info: BillingInfo
	cancellation_reason: CancellationReason
	subscription_status: string
	scheduled_to_cancel_date: null
	is_processing: boolean
	next_billing_time: string
	pay_pal_plan_price: number
}

export interface BillingInfo {
	outstanding_balance: OutstandingBalance
	cycle_executions: CycleExecution[]
	last_payment: LastPayment
	next_billing_time: null
	final_payment_time: null
	failed_payments_count: number
}

export interface CycleExecution {
	tenure_type: string
	sequence: number
	cycles_completed: number
	cycles_remaining: number
	total_cycles: number
	current_pricing_scheme_version: number
}

export interface LastPayment {
	amount: OutstandingBalance
	time: string
}

export interface OutstandingBalance {
	currency_code: string
	value: string
}

export interface CancellationReason {
	did_not_understand: boolean
	not_need_anymore: boolean
	high_price: boolean
	other: string
}

export interface Link {
	href: string
	rel: string
	method: string
}

export interface Subscriber {
	name: Name
	email_address: string
	shipping_address: ShippingAddress
}

export interface Name {
	given_name: string
	surname: string
}

export interface ShippingAddress {
	name: null
	address: Address
}

export interface Address {
	address_line1: null
	address_line2: null
	admin_area2: null
	admin_area1: null
	postal_code: string
	country_code: string
}

export interface User {
	id: string
	name: string
	email: string
	language: string
}

export interface BillingAccount {
	user_id: string
	email: string
	name: string
	address: BillingAccountAddress
	invoices: Invoice[]
	account_type: string
	fiscal_id: string
	active: boolean
	id: string
	version: number
	created_at: string
	created_by: string
	updated_at: string
	updated_by: string
	pending_invoices: Invoice[]
	tax: Tax
	fiscal_id_by_country: null
}
export interface Invoice {
	pay_pal_plan_id: string
	payment_id: string
	status: string
	id: number
	number: string
	hash: string
	created_at: string
	updated_at: string
}
export interface Tax {
	tax_id: string
	tax_exemption: string
}
export interface BillingAccountRequest {
	name: string
	email: string
	account_type: string
	fiscal_id: null | string
	address: BillingAccountAddress
}
export interface BillingAccountAddress {
	street: string
	country: string
	number: string
	state: string
	city: string
	postal_code: string
	complement?: string
}
export interface PlanProps {
	plan: PlanInfos
	numberOfMembers: number
	vacancies: number
	numberOfJourneys: number | undefined
	subscriptionInfo: Subscription
}
export interface StatsProps {
	planLevel: number
	numberOfMembers: number
	vacancies: number
	numberOfJourneys: number | undefined
}
export interface PlanDetailProps {
	title: string
	subscription: Subscription
}
export interface BillInfoProps {
	title: string
	value: string
}
export interface PaymentHistoryType {
	currency_code: string
	date: string
	las_payment_time: string
	next_billing_time: string
	plan_type: string
	status: string
	value: string
}
export interface PaymentHistorySummary {
	content: PaymentHistoryType[]
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

export interface PaginationInfo {
	first: boolean
	last: boolean
	pageSize: number
	totalPages: number
	totalElements: number
}

export interface SubscriptionRequest {
	plan_type: string
	return_url: string
	cancel_url: string
}

export type StatusType =
	| 'APPROVAL_PENDING'
	| 'ACTIVE'
	| 'CANCEL_SCHEDULED'
	| 'CANCEL_REQUESTED'
	| 'SUSPENDED'
	| 'CANCELLED'
	| 'WEBHOOK_PENDING'
	| 'PAYMENT_FAILED'

export interface SubscriptionStatus {
	status: string
	description: string
}

export type CompanySizeType =
	| 'COMPANY_1_10'
	| 'COMPANY_11_50'
	| 'COMPANY_51_200'
	| 'COMPANY_201_500'
	| 'COMPANY_501_1000'
	| 'COMPANY_OVER_1000'

export type TopicOfInterestType =
	| 'ENTERPRISE_PLAN'
	| 'PRODUCT_DEMO'
	| 'EVENTS'
	| 'PRESS_CONTACT'
	| 'PARTNERSHIP'
	| 'EDUCATORS_AND_STUDENTS'
	| 'CANCELLATION'
	| 'SUPPORT'

export interface Contact {
	name: string
	last_name: string
	email: string
	company?: string
	profession?: string
	company_size?: CompanySizeType
	topic_of_interest: TopicOfInterestType
	description: string
}

export interface SubscriptionStatusTokens {
	token: string
	ba_token: string
}
