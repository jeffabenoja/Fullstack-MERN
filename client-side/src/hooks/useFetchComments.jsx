import { useState, useEffect, useCallback } from "react"

export const useFetchComments = (postId) => {
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  const getComments = useCallback(async () => {
    if (!postId) return // Return early if postId is not defined

    try {
      const res = await fetch(`/api/comment/getComments/${postId}`)

      if (res.ok) {
        const data = await res.json()
        setComments(data)
      } else {
        setError("Failed to load comments")
        console.error("Failed to load comments: ", await res.text())
      }
    } catch (err) {
      setError(err.message)
      console.error("Error fetching comments: ", err)
    }
  }, [postId])

  const likeComment = async (commentId, currentUser, navigate) => {
    try {
      if (!currentUser) {
        navigate("/register")
        return
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      })

      if (res.ok) {
        const data = await res.json()
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        )
      } else {
        console.error("Failed to like comment: ", await res.text())
      }
    } catch (err) {
      console.error("Error liking comment: ", err)
    }
  }

  useEffect(() => {
    getComments()
  }, [getComments])

  return { comments, error, likeComment, refetch: getComments }
}
