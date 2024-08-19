import { Pageable, Sort } from "./common-model"

export type PlanTypes = 'BASIC' | 'PRO' | 'ENTERPRISE' | 'TEAM'

export type Rules = {
  key: string
  application: string
  active: boolean
}

export type CreateUserParams = {
  email: string
  language: string
  name: string
  password: string
  term_accepted: boolean
  newsletter_accepted: boolean
}

type UserNetworkInfo = {
  following_count: number
  followers_count: number
}

export type User = {
  credits: number
  avatar_url: string
  bio: string
  company: string
  created_at: string
  email: string
  id: string
  lab_logo: string
  lab_name: string
  language: string
  my_project_limit: number
  name: string
  phone: string
  plan: Plan
  remove_sharings_from_projects: boolean
  roles: string[]
  sharings: Sharing[]
  updated_at: string
  username: string
  term_accepted: boolean
  network_info: UserNetworkInfo
  social_media: SocialMedia
  extra: UserExtraInfo
}

export type UserExtraInfo = {
  acting: string,
  discover_strateegia: string,
  strateegia_usage: string

}

export type EmailConfig = {
  receive_notice_point: boolean
  receive_convergence_point: boolean
  receive_checkpoint: boolean
  receive_invite_project_participation: boolean
}

export type Plan = {
  project_limit: number
  sharing_limit: number
  type: PlanTypes
  user_limit: number
  final_date: string
}

export type Sharing = {
  avatar_url: string
  email: string
  id: string
  keep_on_downgrade: boolean
  name: string
  project_limit: number
}

export type SharingLab = {
  avatar_url?: string
  bio?: string
  email: string
  id: string
  lab_logo?: string
  lab_name: string
  name: string
  plan_type: string
  project_limit: number
  username: string
}

export type UpdateUserParams = {
  bio?: string
  company?: string
  email?: string
  name?: string
  phone?: string
}

export type UpdateUserInfoParams = {
  bio?: string
  name?: string
}

export type UpdateUserTerms = {
  term_accepted?: boolean
}

export type FollowResponse = {
  content: Follow[]
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

export type Follow = {
  is_mutual_follow: boolean,
  following?: boolean
  user: UserFollow
}

export type FollowType = 'follower' | 'following'

export type PublicUser = {
  is_mutual_follow: boolean
  followers_count: number
  following: boolean
  following_count: number
  follows_me: boolean
  has_public_kits: boolean
  has_public_projects: boolean
  has_public_templates: boolean
  user: UserFollow
  social_media: SocialMedia
}

export type SocialMedia = {
  facebook?: string
  instagram?: string
  linkedin?: string
  twitter?: string
}

export type UserFollow = {
  avatar_url: string
  bio: string
  id: string
  name: string
  username: string
}

export type ApiKeyResponse = {
  content: KeyContent[]
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

export type KeyContent = {
  api_key: string
  created_at: string
  id: string
  title: string
  updated_at: string
}

export interface DistributeCreditsPayload {
  credit_amount: number;
  project_ids: string[];
  user_id: string;
  user_in_project: boolean;
}
