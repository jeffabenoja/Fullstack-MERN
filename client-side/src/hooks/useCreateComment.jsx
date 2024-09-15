import { useState } from "react"

export const useCreateComment = () => {
  const [commentError, setCommentError] = useState(null)

  const createComment = async (comment, postId, userId, setComments) => {
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setCommentError(null)
        setComments((prevComments) => [data, ...prevComments])
      } else {
        setCommentError("Error creating comment")
      }
    } catch (error) {
      setCommentError(error.message)
    }
  }

  return { createComment, commentError }
}
