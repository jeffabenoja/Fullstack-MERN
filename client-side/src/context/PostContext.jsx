import { createContext, useContext, useState } from "react"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { app } from "../firebase/firebase"

const PostContext = createContext()

export const usePost = () => {
  return useContext(PostContext)
}

export const PostProvider = ({ children }) => {
  const [userPost, setUserPost] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState(null)
  const [file, setFile] = useState(null)
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [publishError, setPublishError] = useState(null)

  const fetchPost = async (url, setFormData) => {
    try {
      const res = await fetch(url)
      const data = await res.json()

      // Handle the case where the response is not successful
      if (!res.ok) {
        console.log(data.message)
        setPublishError(data.message)
        return
      }

      // Handle the case where formData is not provided
      if (!setFormData) {
        setUserPost(data.posts)

        // Check if there are fewer than 9 posts to decide whether to show more
        if (data.posts.length < 9) {
          setShowMore(false)
        }
      } else {
        // Handle the case where formData is provided
        setFormData(data.posts[0])
        setPublishError(null) // Clear any previous errors
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

  const uploadImage = async (formData, setFormData) => {
    try {
      if (!file) {
        setImageFileUploadError("Please select an image")
        return
      }
      setImageFileUploadError(null)
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageFileUploadingProgress(progress.toFixed(0))
        },
        (error) => {
          setImageFileUploadError(
            `Could not upload image (File must be less than 2MB)`
          )
          setImageFileUploadingProgress(null)
          setFile(null)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageFileUploadingProgress(null)
            setImageFileUploadError(null)
            setFormData({ ...formData, image: downloadUrl })
          })
        }
      )
    } catch (error) {
      setImageFileUploadError("Image upload failed")
      setImageFileUploadingProgress(null)
    }
  }

  const sendPostAPI = async (url, fetchMethod, formData, navigate) => {
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
    uploadImage,
    imageFileUploadError,
    imageFileUploadingProgress,
    setFile,
    publishError,
    sendPostAPI,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
