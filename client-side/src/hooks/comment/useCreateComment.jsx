import { useMutation } from "@tanstack/react-query"

export const useCreateComment = (onSuccess) => {
  const createComment = async ({ comment, postId, userId }) => {
    const res = await fetch("/api/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment, postId, userId }),
    })

    if (!res.ok) {
      const error = await res.json() // Parse the error response
      throw new Error(error.message || "Error creating comment") // Use error message from server or default message
    }

    return res.json()
  }

  // Use `useMutation` to handle creating a comment
  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      onSuccess() // Refetch the comments after successful comment creation
    },
    onError: (error) => {
      console.error("Error creating comment:", error.message) // Log the error message
    },
  })

  return {
    createComment: createCommentMutation.mutate,
    commentError: createCommentMutation.error,
  }
}
