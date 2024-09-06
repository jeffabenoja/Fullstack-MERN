import { createContext, useContext, useState } from "react"

const AppDataContext = createContext()

export const useData = () => {
  return useContext(AppDataContext)
}

export const AppDataProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [showMorePosts, setShowMorePosts] = useState(true)
  const [showMoreUsers, setShowMoreUsers] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchData = async (url, setFormData) => {
    try {
      const res = await fetch(url)
      const data = await res.json()

      // Handle the case where the response is not successful
      if (!res.ok) {
        console.log(data.message)
        return
      }

      // Handle the case where formData is not provided
      if (!setFormData) {
        setData(data.posts || data.users)

        // Check if there are fewer than 9 posts to decide whether to show more
        if (data?.posts?.length < 9 || data?.user?.length < 9) {
          setShowMore(false)
        }
      } else {
        // Handle the case where formData is provided
        setFormData(data.posts[0])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const showMoreData = async (url, isPost = true) => {
    try {
      const res = await fetch(url)
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Failed to fetch data")

      if (isPost && data.posts) {
        setData((prev) => [...prev, ...data.posts])
        console.log(data)
        if (data.posts.length < 9) {
          setShowMorePosts(false)
        }
      } else if (!isPost && data.users) {
        setData((prev) => [...prev, ...data.users])
        console.log(data)
        if (data.users.length < 9) {
          setShowMoreUsers(false)
        }
      }
    } catch (error) {
      console.log("Error fetching data:", error)
    }
  }

  const deleteData = async (url, id) => {
    setShowModal(false)
    try {
      const res = await fetch(url, {
        method: "DELETE",
      })
      const data = await res.json()

      if (!res.ok) {
        console.log(data.message)
      } else {
        setData((prev) => prev.filter((data) => data._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const value = {
    fetchData,
    showMorePosts,
    showMoreUsers,
    data,
    showMoreData,
    showModal,
    setShowModal,
    deleteData,
  }

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  )
}
