import { Alert, Button, Textarea } from "flowbite-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useFetchComments } from "../hooks/comment/useFetchComments"
import { useCreateComment } from "../hooks/comment/useCreateComment"
import { useUpdateComment } from "../hooks/comment/useUpdateComment"
import Comment from "./Comment"

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user)
  const [comment, setComment] = useState("")
  const navigate = useNavigate()

  // Custom hooks
  const { comments, likeComment, refetch } = useFetchComments(postId)
  const { createComment, commentError } = useCreateComment(refetch)
  const { updateComment } = useUpdateComment()

  const handleEdit = (comment, updatedContent) => {
    updateComment(comment, updatedContent)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (comment.length <= 200) {
      createComment({ comment, postId, userId: currentUser._id })
      setComment("")
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
            className='h-5 w-5 object-cover rounded-full'
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

      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={() => likeComment(comment._id, currentUser, navigate)}
              onEdit={handleEdit}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default CommentSection
