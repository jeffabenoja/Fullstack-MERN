import { useState, useEffect } from "react"

export const useFetchUserComment = (userId) => {
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`)
        const data = await res.json()

        if (res.ok) {
          setUser(data)
        } else {
          setError("Failed to fetch user")
        }
      } catch (error) {
        setError(error.message || "An error occurred")
      }
    }

    if (userId) {
      getUser()
    }
  }, [userId])

  return { user, error }
}
