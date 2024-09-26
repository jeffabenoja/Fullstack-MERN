export const deleteData = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete comment")
  }
  return response.json()

  // `/api/post/deleteposts/${postId}/${userId}`
}

export const nextUserPage = (lastPage, allPages) => {
  const moreDataAvailable = lastPage.users.length === 9 // Adjust based on your data structure
  return moreDataAvailable ? allPages.length * 9 : undefined
}
