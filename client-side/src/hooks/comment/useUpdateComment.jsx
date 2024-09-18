import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  const updateComment = (comment, updatedContent) => {
    updateCommentMutation.mutate({ commentId: comment._id, updatedContent })
  }

  const updateCommentMutation = useMutation({
    mutationFn: async ({ commentId, updatedContent }) => {
      const response = await fetch(`/api/comment/editComment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: updatedContent }),
      })

      if (!response.ok) {
        throw new Error("Failed to update comment")
      }
      return response.json()
    },
    onSuccess: () => {
      // Refetch comments or update local state if needed
      queryClient.invalidateQueries(["comments"])
    },
    onError: (error) => {
      console.error("Error updating comment: ", error.message)
    },
  })

  return {
    updateComment,
    updateCommentError: updateCommentMutation.error,
  }
}
