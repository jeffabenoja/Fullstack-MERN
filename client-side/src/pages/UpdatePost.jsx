import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import "react-circular-progressbar/dist/styles.css"
import { useNavigate, useParams } from "react-router-dom"
import { CircularProgressbar } from "react-circular-progressbar"
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import usePost from "../hooks/usePost"
import useUpload from "../hooks/useUpload"
import { useData } from "../context/AppDataContext"

const UpdatePost = () => {
  const {
    uploadImage,
    imageFileUploadError,
    imageFileUploadingProgress,
    setFile,
  } = useUpload()
  const { fetchData } = useData()
  const { publishError, fetchPost } = usePost()
  const navigate = useNavigate()
  const { postId } = useParams()

  // Ensure formData is initialized with default values
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized", // Default value
    content: "",
  })

  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    fetchData(`/api/post/getposts?postId=${postId}`, setFormData)
  }, [postId])

  const handleUploadImage = () => {
    uploadImage(formData, setFormData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    fetchPost(
      `/api/post/updatepost/${formData._id}/${currentUser._id}`,
      "PUT",
      formData,
      navigate
    )
  }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 md:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title || ""} // Ensure value is always defined
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || "uncategorized"} // Ensure value is always defined
          >
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
          value={formData.content || ""} // Ensure value is always defined
          placeholder="What's on your mind?"
          className='h-72 mb-12'
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Update post
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  )
}

export default UpdatePost
