import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import { usePosts } from "../hooks/usePosts"
import useUpload from "../hooks/useUpload"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const UpdatePost = () => {
  const { currentUser } = useSelector((state) => state.user)
  const {
    uploadImage,
    imageFileUploadError,
    imageFileUploadingProgress,
    setFile,
  } = useUpload()
  const { postId } = useParams()
  const { formData, setFormData, updatePost, publishError } =
    usePostForm(postId)

  // Update form data based on post changes (this handles it without useEffect)
  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }))
  }

  // Handle image upload
  const handleUploadImage = () => {
    uploadImage(formData, setFormData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updatePost({
      data: formData,
      url: `/api/post/updatepost/${postId}/${currentUser._id}`,
    })
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
            onChange={(e) => handleFormDataChange("title", e.target.value)}
            value={formData.title}
          />
          <Select
            onChange={(e) => handleFormDataChange("category", e.target.value)}
            value={formData.category}
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
        {formData.image && (
          <img
            src={formData.image}
            alt='upload image'
            className='w-full h-72 object-cover'
          />
        )}
        <ReactQuill
          theme='snow'
          value={formData.content}
          placeholder="What's on your mind?"
          className='h-72 mb-12'
          required
          onChange={(value) => handleFormDataChange("content", value)}
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

const usePostForm = (postId) => {
  const POST_BY_ID = `/api/post/getposts?postId=${postId}`

  const {
    post,
    updatePost,
    updatePostError: publishError,
  } = usePosts(POST_BY_ID, postId)
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
    image: "",
  })

  // Update formData if post changes
  // Use useEffect to update formData when data changes
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        category: post.category,
        content: post.content,
        image: post.image,
      })
    }
  }, [post])

  return { formData, setFormData, updatePost, publishError }
}
