import { makeComment } from "@/services/divergence-point";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Comments } from "@/types/maps/comments";

interface CommentParams {
  text: string;
  divergencePointId: string;
  questionId: string;
}

export function useMutateComment(
  options?: Partial<
    UseMutationOptions<Comments, unknown, CommentParams, unknown>
  >
) {
  return useMutation<Comments, unknown, CommentParams, unknown>({
    mutationFn: ({ text, divergencePointId, questionId }) =>
      makeComment(text, divergencePointId, questionId),
    ...options,
  });
}
