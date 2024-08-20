import fetch from "@/config/fetch";
import { Map } from "@/types/maps";

export const getMapById = async (mapId: string) => {
  return await fetch<Map>({
    url: `projects/v1/map/${mapId}`,
    method: "GET",
  }).then(({ data }) => data);
};
