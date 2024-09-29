import { deleteData } from "../api/apiUrl"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteData = (queryKey) => {
  const queryClient = useQueryClient()
  const deletePostMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      // Invalidate the posts query to refetch the latest data
      queryClient.invalidateQueries(queryKey)
    },

    onError: (error) => {
      console.error("Error deleting comment:", error.message)
    },
  })

  return {
    deletePost: deletePostMutation.mutate,
    deletePostError: deletePostMutation.error,
  }
}
