import { createContext, useContext, useState } from "react"

const PostContext = createContext()

export const usePost = () => {
  return useContext(PostContext)
}

export const PostProvider = ({ children }) => {
  const [showMore, setShowMore] = useState(true)
  const [userPost, setUserPost] = useState([])

  const fetchPost = async (id) => {
    try {
      const res = await fetch(`/api/post/getPosts?userId=${id}`)
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
        `api/post/getPosts?userId=${id}&startIndex=${startIndex}`
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

  const value = {
    fetchPost,
    showMore,
    userPost,
    showMorePost,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
