import fetch from "@/config/fetch";
import { GeneralData } from "@/types/maps";
import { Comments } from "@/types/maps/comments";

export const makeComment = async (
  text: string,
  divergencePointId: string,
  questionId: string
) => {
  const { data } = await fetch<Comments>({
    url: `/projects/v1/divergence-point/${divergencePointId}/question/${questionId}/comment`,
    method: "POST",
    data: { text },
  });
  data.replies = [];
  return data;
};

export const getDivergencePointById = async (divergencePointId: string) => {
  return await fetch<GeneralData>({
    url: `projects/v1/divergence-point/${divergencePointId}`,
    method: "GET",
  }).then(({ data }) => data);
};
