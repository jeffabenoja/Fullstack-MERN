export const useLikeComment = () => {
  const likeComment = async (
    commentId,
    currentUser,
    comments,
    setComments,
    navigate
  ) => {
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
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { likeComment }
}
