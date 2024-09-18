// import { useState, useEffect, useCallback } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useFetchComments = (postId) => {
  const queryClient = useQueryClient()

  const fetchComments = async () => {
    const res = await fetch(`/api/comment/getComments/${postId}`)
    if (!res.ok) {
      throw new Error("Failed to load comments")
    }
    return res.json()
  }

  // fetching comments
  const {
    data: comments = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", postId], // Unique query key, dependent on postId
    queryFn: fetchComments, // Fetch function
    enabled: !!postId, // Fetch only if postId is available
  })

  // Mutation to like a comment using `useMutation`
  const likeCommentMutation = useMutation({
    mutationFn: async ({ commentId }) => {
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      })
      if (!res.ok) {
        throw new Error("Failed to like comment")
      }
      return res.json() // Return the updated likes data
    },
    onSuccess: (data, { commentId }) => {
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

  // Function to trigger the `likeComment` mutation
  const likeComment = (commentId, currentUser, navigate) => {
    if (!currentUser) {
      navigate("/register") // Redirect to register if the user isn't logged in
      return
    }
    // Trigger the mutation
    likeCommentMutation.mutate({ commentId })
  }

  return { comments, error, isLoading, refetch, likeComment }
}
