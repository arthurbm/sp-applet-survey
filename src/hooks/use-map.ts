import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { Map } from "@/types/maps";
import { getMapById } from "@/services/map";

export function useMapById<T = Map>(
  id: string,
  options?: Partial<UseQueryOptions<Map, unknown, T, [string, string]>>
) {
  return useQuery<Map, unknown, T, [string, string]>({
    queryKey: ["map", id],
    queryFn: () => getMapById(id),
    ...options,
  });
}
