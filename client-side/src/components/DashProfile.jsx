import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"

import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { app } from "../firebase/firebase"
import { useState, useRef, useEffect } from "react"
import "react-circular-progressbar/dist/styles.css"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { CircularProgressbar } from "react-circular-progressbar"
import { Alert, Button, Modal, TextInput } from "flowbite-react"
import { useAuth } from "../context/authContext"

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user)
  const fileRef = useRef()
  const [formData, setFormData] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null)
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null)
  const { signOutUser, showModal, setShowModal, deleteUser, updateUser } =
    useAuth()

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  useEffect(() => {
    if (imageFile) {
      uploadImageFile()
    }
  }, [imageFile])

  const uploadImageFile = async () => {
    setImageFileUploading(true)
    setImageFileUploadError(null)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageFileUploadingProgress(progress.toFixed(0))
      },
      (error) => {
        setImageFileUploadError(
          `Could not upload image (File must be less than 2MB)`
        )
        setImageFileUploadingProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl)
          setFormData({ ...formData, profilePicture: downloadUrl })
          setImageFileUploading(false)
        })
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    setImageFileUploadingProgress(null)

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made")
      return
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload")
      return
    }

    updateUser(formData, currentUser._id, setUpdateUserSuccess)
  }

  const handleDeleteUser = async () => {
    deleteUser(currentUser._id)
  }

  const handleSignOut = () => {
    signOutUser()
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          id='profilePicture'
          className='rounded'
          onChange={handleImageChange}
          ref={fileRef}
          hidden
        />
        <div
          className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative'
          onClick={() => fileRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rbga(62,152,99, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user icon'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}

        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Update Profile"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/post/create-post"}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignOut} className='cursor-pointer'>
          Log Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashProfile
