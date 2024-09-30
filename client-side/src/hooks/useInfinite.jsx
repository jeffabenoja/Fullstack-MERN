import { fetchPosts } from "../api/post"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useInfiniteData = (queryKey, url, enabled, nextPage) => {
  // Infinite query for posts
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam = 0 }) => fetchPosts(`${url}${pageParam}`), // Fetch function with dynamic pageParam
    enabled: !!enabled, // !!currentUser?._id, // Only run if userId exists
    getNextPageParam: nextPage,
  })

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
