import fetch from "@/config/fetch";
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
