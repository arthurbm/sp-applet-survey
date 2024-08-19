import { Color } from "@/utils/string-to-color";
import { Pageable, Sort, Visibility } from "./common-model";
import { Map } from "./maps";
import { Lab } from "./labs";
import { UsefulLink } from "./useful-link";

export type JourneyParticipation = {
  key: string;
  count: number;
  project_role: ProjectRole;
};

export type ProjectRole = "ADMIN" | "MENTOR" | "INVESTOR" | "INNOVATOR";

export interface JourneysSummaryResponse {
  content: JourneySummary[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  number_of_elements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  total_elements: number;
  total_pages: number;
}

export interface JourneySummaryMap {
  id: string;
  title: string;
}
export interface JourneySummary {
  created_at: string;
  description: string;
  id: string;
  lab: Lab;
  member_active_count: number;
  member_count: number;
  title: string;
  color: Color;
  my_member_info: myMemberInfo;
  author: Author;
  maps: JourneySummaryMap[];
  member_pending_approval_count: number;
  visibility: Visibility;
  request_nda: boolean;
  pro: boolean;
}

export interface Author {
  avatar_url: string;
  id: string;
  name: string;
  username: string;
}

export interface myMemberInfo {
  project_roles: ProjectRole[];
  status: string;
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  users: User[];
  maps: Map[];
  connection_links: UsefulLink[];
  created_at: string;
  lab: Lab;
  color: Color;
  visibility: string;
  request_nda: boolean;
  pro: boolean;
}

export interface JourneyResponse {
  content: Journey[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  number_of_elements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  total_elements: number;
  total_pages: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  username: string;
  roles: string[];
  project_roles: ProjectRole[];
  bio?: string;
  avatar_url?: string;
  status: string;
  language: string;
  lab_name?: string;
  active?: boolean;
}

export interface PublicLinkResponse {
  code: string;
  created_at: string;
  id: string;
  project_id: string;
  approve_all: boolean;
}
export interface UserLabLogo {
  lab_logo: string;
}

export const PlanTypes = [
  "BASIC",
  "PRO",
  "TEAM",
  "ENTERPRISE",
  "CUSTOM",
] as const;

export type PlanType = (typeof PlanTypes)[number];
export interface PlanByLabs {
  id: string;
  name: string;
  plan_type: PlanType;
  usage: Usage;
  username: string;
  lab_name: string;
}
export interface Usage {
  id: string;
  projects_created: number;
  users_added: number;
  basic_projects_created: number;
  pro_projects_created: number;
}
export interface Statistics {
  agreements_comments_count: number;
  created_at: string;
  divergence_points_count: number;
  id: string;
  ied: number;
  ief: number;
  iep: number;
  parent_comments_count: number;
  participation: number;
  people_active_count: number;
  potential: number;
  question_count: number;
  replied_parent_comments_count: number;
  reply_comments_count: number;
  title: string;
  total_comments_count: number;
}

export interface Template {
  author: Author;
  color: string;
  description: string;
  id: string;
  title: string;
}

export type InitialCreateJourney = {
  maps: JourneySummaryMap[];
  id?: string;
  title: string;
  lab_owner_id?: string;
  color: string;
  description: string | null | undefined;
  template_id?: string;
};

export type UpdateJourneyVisibilityParams = {
  description: string;
  final_public_date?: string;
  price?: string;
  request_nda: boolean;
  start_content_date?: string;
  title: string;
  vacancy_count?: number;
  visibility: Visibility;
};

export interface ConnectionLink {
  id: string;
  read: boolean;
  connection_link_id: string;
}
