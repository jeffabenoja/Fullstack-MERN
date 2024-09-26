import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import {
  fetchComments,
  likeComment,
  updateComment,
  createComment,
  deleteComment,
} from "../../api/comment"

export const useComments = (postId) => {
  const queryClient = useQueryClient()

  // Fetch comments
  const {
    data: comments = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId, // Only run if postId exists
  })

  // Use `useMutation` to handle creating a comment
  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      refetch() // Refetch the comments after successful comment creation
    },
    onError: (error) => {
      console.error("Error creating comment:", error.message) // Log the error message
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      // // Refetch comments or update local state if needed
      // queryClient.invalidateQueries(["comments"])
      refetch()
    },
    onError: (error) => {
      console.error("Error updating comment: ", error.message)
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      console.error("Error deleting comment:", error.message)
    },
  })

  // Mutation to like a comment using `useMutation`
  const likeCommentMutation = useMutation({
    mutationFn: likeComment,

    onSuccess: (data, commentId) => {
      // On successful mutation, update the cache for the comments query
      queryClient.setQueryData(["comments", postId], (oldData) => {
        if (!oldData) return []
        return oldData.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length,
              }
            : comment
        )
      })
    },
    onError: (error) => {
      console.error("Error liking comment: ", error.message)
    },
  })

  return {
    comments,
    isLoading,
    error,
    createComment: createCommentMutation.mutate,
    commentError: createCommentMutation.error,
    updateComment: updateCommentMutation.mutate,
    updateCommentError: updateCommentMutation.error,
    deleteComment: deleteCommentMutation.mutate,
    deleteError: deleteCommentMutation.error,
    likeComment: likeCommentMutation.mutate,
  }
}
