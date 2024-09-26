export const createComment = async ({ comment, postId, userId }) => {
  const res = await fetch("/api/comment/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: comment, postId, userId }),
  })

  if (!res.ok) {
    const error = await res.json() // Parse the error response
    throw new Error(error.message || "Error creating comment") // Use error message from server or default message
  }

  return res.json()
}

export const fetchComments = async (postId) => {
  const res = await fetch(`/api/comment/getComments/${postId}`)
  if (!res.ok) {
    throw new Error("Failed to load comments")
  }
  return res.json()
}

export const updateComment = async ({ commentId, updatedContent }) => {
  const response = await fetch(`/api/comment/editComment/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: updatedContent }),
  })

  if (!response.ok) {
    throw new Error("Failed to update comment")
  }
  return response.json()
}

export const deleteComment = async (commentId) => {
  const response = await fetch(`/api/comment/deleteComment/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete comment")
  }
  return response.json()
}

export const likeComment = async (commentId) => {
  const res = await fetch(`/api/comment/likeComment/${commentId}`, {
    method: "PUT",
  })
  if (!res.ok) {
    throw new Error("Failed to like comment")
  }
  return res.json()
}
