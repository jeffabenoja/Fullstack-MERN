export const createPost = async (data) => {
  const res = await fetch("/api/post/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json() // Parse the error response
    throw new Error(error.message || "Error creating post") // Use error message from server or default message
  }

  return res.json()
}

export const fetchPosts = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to load post")
  }
  return res.json()
}

export const updatePost = async ({ data, url }) => {
  if (!data) {
    console.error("Data is invalid:", data)
    return
  }
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json() // Parse the error response
    throw new Error(error.message || "Error creating post") // Use error message from server or default message
  }

  return res.json()
}

export const nextPostPage = (lastPage, allPages) => {
  const moreDataAvailable = lastPage.posts.length === 9 // Adjust based on your data structure
  return moreDataAvailable ? allPages.length * 9 : undefined
}
