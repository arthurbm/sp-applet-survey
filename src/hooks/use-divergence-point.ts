import { getDivergencePointById } from "@/services/divergence-point";
import { GeneralData } from "@/types/maps";
import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

export function useDivergencePointById<T = GeneralData>(
  id: string,
  options?: Partial<UseQueryOptions<GeneralData, unknown, T, [string, string]>>
) {
  return useQuery<GeneralData, unknown, T, [string, string]>({
    queryKey: ["map", id],
    queryFn: () => getDivergencePointById(id),
    ...options,
  });
}
