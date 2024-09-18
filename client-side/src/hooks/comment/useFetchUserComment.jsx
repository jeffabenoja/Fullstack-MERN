import { useQuery } from "@tanstack/react-query"

export const useFetchUserComment = (comment) => {
  const getUser = async () => {
    if (!comment.userId) return null

    const res = await fetch(`/api/user/${comment.userId}`)
    if (!res.ok) {
      throw new Error("Failed to load comments")
    }
    return res.json()
  }

  // fetching user
  const { data: user = null, error } = useQuery({
    queryKey: ["user", comment], // Unique query key, dependent on comment
    queryFn: getUser, // Fetch function
    enabled: !!comment, // Fetch only if comment is available
  })

  return { user, error }
}
