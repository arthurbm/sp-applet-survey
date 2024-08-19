import { Color } from "@/utils/string-to-color";

export type SortOrder = "ASC" | "DESC";
type Tiers = "CUSTOM";

interface Params {
  [key: string]: string | unknown;
  sort?: [string, SortOrder];
  tiers?: Tiers;
  size?: number;
  color?: Color;
  projectRoles?: string[];
}

export const mountParams = (params: Params) => {
  const mountedParams = {
    ...params,
    sort: params.sort?.join(","),
    color: params.color?.toUpperCase(),
    projectRoles: params.projectRoles?.join(","),
  };
  if (params.projectRoles && params.projectRoles.length === 0) {
    delete mountedParams?.projectRoles;
  }
  return mountedParams;
};
