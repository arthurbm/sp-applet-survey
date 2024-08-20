import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { Journey } from "@/types/journeys-models";
import { getJourneyById } from "@/services/journey";

export function useJourney<T = Journey>(
  id: string,
  options?: Partial<UseQueryOptions<Journey, unknown, T, [string, string]>>
) {
  return useQuery<Journey, unknown, T, [string, string]>({
    queryKey: ["journey", id],
    queryFn: () => getJourneyById(id),
    ...options,
  });
}
