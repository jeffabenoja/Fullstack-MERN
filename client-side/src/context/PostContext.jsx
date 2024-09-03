import { createContext, useContext, useState } from "react"

const PostContext = createContext()

export const usePost = () => {
  return useContext(PostContext)
}

export const PostProvider = ({ children }) => {
  const [userPost, setUserPost] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState(null)

  const fetchPost = async (id) => {
    try {
      const res = await fetch(`/api/post/getposts?userId=${id}`)
      const data = await res.json()
      if (res.ok) {
        setUserPost(data.posts)
        if (data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const showMorePost = async (id, startIndex) => {
    try {
      const res = await fetch(
        `api/post/getposts?userId=${id}&startIndex=${startIndex}`
      )
      const data = await res.json()
      if (res.ok) {
        setUserPost((prev) => [...prev, ...data.posts])
        if (data.posts.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async (userId) => {
    setShowModal(false)
    try {
      const res = await fetch(
        `/api/post/deleteposts/${postIdToDelete}/${userId}`,
        {
          method: "DELETE",
        }
      )
      const data = await res.json()

      if (!res.ok) {
        console.log(data.message)
      } else {
        setUserPost((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const value = {
    fetchPost,
    showMore,
    userPost,
    showMorePost,
    showModal,
    setShowModal,
    postIdToDelete,
    setPostIdToDelete,
    deletePost,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
