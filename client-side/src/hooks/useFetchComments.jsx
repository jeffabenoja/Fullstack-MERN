import { useState, useEffect } from "react"

export const useFetchComments = (postId) => {
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments/${postId}`)

        if (res.ok) {
          const data = await res.json()
          setComments(data)
        } else {
          setError("Failed to load comments")
        }
      } catch (error) {
        setError(error.message)
      }
    }

    if (postId) {
      getComments()
    }
  }, [postId])

  return { comments, setComments, error }
}
