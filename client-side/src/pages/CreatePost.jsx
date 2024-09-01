import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { app } from "../firebase/firebase"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import "react-circular-progressbar/dist/styles.css"
import { CircularProgressbar } from "react-circular-progressbar"

const CreatePost = () => {
  const [file, setFile] = useState(null)
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null)
  const [imageFileUploadError, setImageFileUploadError] = useState(null)
  const [formData, setFormData] = useState({})

  const handleUploadImage = async () => {
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

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 md:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
          />
          <Select>
            <option value='uncategorized'>Select Category</option>
            <option value='javaScript'>JavaScript</option>
            <option value='reactjs'>React.JS</option>
            <option value='nextjs'>Next.JS</option>
            <option value='typescript'>Typescript</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageFileUploadingProgress}
          >
            {imageFileUploadingProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageFileUploadingProgress}
                  text={`${imageFileUploadingProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        {formData?.image && (
          <img
            src={formData.image}
            alt='upload image'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill
          theme='snow'
          placeholder="What's on your mind?"
          className='h-72 mb-12'
          required
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
      </form>
    </div>
  )
}

export default CreatePost
