import { useState } from "react"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { app } from "../firebase/firebase"

const useUpload = () => {
  const [file, setFile] = useState(null)
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)

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

  return {
    setFile,
    file,
    imageFileUploadError,
    imageFileUploadingProgress,
    uploadImage,
  }
}

export default useUpload
