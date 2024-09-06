import { useState } from "react"

const usePost = () => {
  const [publishError, setPublishError] = useState(null)

  const fetchPost = async (url, fetchMethod, formData, navigate) => {
    try {
      const res = await fetch(url, {
        method: fetchMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setPublishError(data.message)
        return
      }

      if (res.ok) {
        setPublishError(null)
        navigate(`/post/${data.slug}`)
      }
    } catch (error) {
      setPublishError(`Something went wrong`)
    }
  }

  return { publishError, fetchPost }
}

export default usePost
