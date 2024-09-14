import { Alert, Button, Textarea } from "flowbite-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user)
  const [commentError, setCommentError] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (comment.length > 200) {
      return
    }

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setComment("")
        setCommentError(null)
        setComments([data, ...comments])
      }
    } catch (error) {
      setCommentError(error.message)
    }
  }

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            alt='user profile'
            className='h-5 w-5 object-cover rounded-full '
          />
          <Link
            to={`/dashboard?tab=profile`}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm dark:text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link to={"/login"} className='text-blue-500 hover:underline'>
            Login
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Comment...'
            rows='3'
            maxLength='200'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-xs text-gray-500'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}
    </div>
  )
}

export default CommentSection
