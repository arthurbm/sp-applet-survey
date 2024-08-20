import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryFilter } from "@/types/common-model";
import { journeysSummary } from "@/services/journey";
import { SortOrder } from "@/services/helpers";
import { JourneysSummaryResponse } from "@/types/journeys-models";

type Params = {
  search?: string;
  order?: SortOrder;
  filter?: QueryFilter;
  projectRoles?: string[];
  sortBy?: string;
  size?: number;
  subdomain?: string;
  enabled?: boolean;
};

export const useMyJourneys = ({
  search = "",
  order = "DESC",
  filter = {},
  projectRoles = [],
  sortBy,
  size,
  subdomain,
  enabled = true,
}: Params) => {
  return useInfiniteQuery({
    queryKey: [
      "journeys",
      search,
      order,
      filter,
      projectRoles,
      sortBy,
      size,
      subdomain,
    ],
    queryFn: ({ pageParam }) => {
      return journeysSummary({
        size: size || 12,
        search,
        order,
        filter,
        pageParam,
        projectRoles,
        sortBy,
        subdomain,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.page_number + 1;
    },
    enabled,
  });
};
