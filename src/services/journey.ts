import { QueryFilter } from "@/types/common-model";
import { mountParams, SortOrder } from "./helpers";
import { JourneysSummaryResponse } from "@/types/journeys-models";
import fetch from "@/config/fetch";

type baseParams = {
  search?: string;
  size?: number;
  sortBy?: string;
  order: SortOrder;
  filter: QueryFilter;
  pageParam: number;
  projectRoles: string[];
  subdomain: string;
};

export const journeySummary = async ({
  search,
  order,
  filter,
  pageParam = 0,
  size,
  projectRoles = [],
  sortBy = "createdAt",
  subdomain,
}: baseParams) => {
  const params = mountParams({
    size,
    page: pageParam,
    sort: [sortBy, order],
    title: search,
    subdomain,
    projectRoles,
    ...filter,
  });

  return await fetch<JourneysSummaryResponse>({
    url: "projects/v1/project/summary",
    method: "GET",
    params,
  }).then(({ data }) => data);
};
