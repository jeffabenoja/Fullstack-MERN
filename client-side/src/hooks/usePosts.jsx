import { useMutation, useQuery } from "@tanstack/react-query"
import { createPost, updatePost, fetchPosts } from "../api/post"
import { useNavigate } from "react-router-dom"
export const usePosts = (query, options) => {
  const navigate = useNavigate()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["post", options], // Add your query key
    queryFn: () => fetchPosts(query), // Your fetch function
    enabled: !!options, // Controls when the query runs
    select: (data) => data.posts[0], // Select the first post
  })

  // Use `useMutation` to handle creating a post
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      // Use navigate inside mutation onSuccess
      navigate(`/post/${data.slug}`) // Navigate to the created post
      refetch()
    },
    onError: (error) => {
      console.error("Error creating post:", error.message) // Log the error message
    },
  })

  // Use `useMutation` to handle update comment
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      // Use navigate inside mutation onSuccess
      navigate(`/post/${data?.slug}`) // Navigate to the created post
      refetch()
    },
    onError: (error) => {
      console.error("Error creating post:", error.message) // Log the error message
    },
  })

  return {
    post: data,
    isLoading,
    error,
    createPost: createPostMutation.mutate,
    createPostError: createPostMutation.error,
    updatePost: updatePostMutation.mutate,
    updatePostError: updatePostMutation.error,
  }
}
