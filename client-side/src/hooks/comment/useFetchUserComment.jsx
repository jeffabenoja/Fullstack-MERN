import { useQuery } from "@tanstack/react-query"

export const useFetchUserComment = (comment) => {
  return useQuery({
    queryKey: ["user", comment.userId], // Unique query key, dependent on each userId who commented
    queryFn: () => getUser(comment), // Fetch function
    enabled: !!comment, // Fetch only if comment is available
  })
}

const getUser = async (comment) => {
  if (!comment) return null

  const res = await fetch(`/api/user/${comment?.userId}`)
  if (!res.ok) {
    throw new Error("Failed to load comments")
  }
  return res.json()
}
