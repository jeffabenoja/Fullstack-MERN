import { useState } from "react"

export const useCreateComment = (onSuccess) => {
  const [commentError, setCommentError] = useState(null)
  // const [isEditing, setIsEditing] = useState(false)

  const createComment = async (comment, postId, userId) => {
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
        onSuccess()
      } else {
        setCommentError("Error creating comment")
      }
    } catch (error) {
      setCommentError(error.message)
    }
  }

  // const updateComment = async (comment, editedContent) => {
  //   try {
  //     const res = await fetch(`/api/comment/editComment/${comment._id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ content: editedContent }),
  //     })

  //     if (res.ok) {
  //       setIsEditing(false)
  //       onEdit(comment, editedContent)
  //     }
  //   } catch (error) {
  //     setCommentError(error.message)
  //   }
  // }

  return { createComment, commentError }
}
