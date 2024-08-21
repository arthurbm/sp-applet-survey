import { Color } from "@/utils/string-to-color";
import { ProjectRole } from "../journeys-models";

export interface Lab {
  id: string;
  name: string;
  owner_name: string;
  logo: string;
}

export namespace Labs {
  export interface Journey {
    id: string;
    title: string;
    description: string;
    created_at: string;
    people: number;
    color: Color;
    divergence_points_count: number;
    total_comments_count: number;
    admin: Labs.User;
  }

  export interface TeamMemberJourney {
    id: string;
    title: string;
    color: Color;
  }

  export interface TeamMember {
    id: string;
    name: string;
    username: string;
    avatar_url: string | null;
    journey_count: number;
  }

  export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    project_roles: ProjectRole[];
    bio: string;
    avatar_url?: string;
    status: string;
    language: string;
    pending_approval: boolean;
    pending_nda: boolean;
    active: boolean;
  }

  export interface labInfo {
    admin: number;
    innovator: number;
    lab: {
      id: string;
      logo: string;
      name: string;
      owner_name: string;
    };
    mentor: number;
  }
}
