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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchData = async (url, setFormData = null, isPost = true) => {
    try {
      const res = await fetch(url)
      const data = await res.json()

      if (!res.ok) {
        setError(true)
        setLoading(false)
        console.log(data.message)
        return
      }

      // If setFormData is provided, it will populate the form data with the fetched data
      if (setFormData) {
        setFormData(isPost ? data.posts[0] : data.users[0])
        setLoading(false)
        setError(false)
      } else {
        // Set data based on whether it's a post or a user
        setData(isPost ? data.posts : data.users)
        setLoading(false)
        setError(false)
        // Show/Hide "Show More" based on the length of the fetched data
        if (isPost && data.posts.length < 9) {
          setShowMorePosts(false)
        } else if (!isPost && data.users.length < 9) {
          setShowMoreUsers(false)
        }
      }
    } catch (error) {
      setError(true)
      setLoading(false)
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
    error,
    loading,
  }

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  )
}
