import moment from "moment"
import { FaThumbsUp } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useFetchUserComment } from "../hooks/useFetchUserComment"
import { Button, Textarea } from "flowbite-react"
import { useState } from "react"
// import { useCreateComment } from "../hooks/useCreateComment"

const Comment = ({ comment, onLike, onEdit, onSuccess }) => {
  // const { updateComment, isEditing, setIsEditing, commentError } =
  //   useCreateComment()

  const { currentUser } = useSelector((state) => state.user)

  const [isEditing, setIsEditing] = useState(false)

  const [editedContent, setEditedContent] = useState(comment.content)

  // Use the custom hook to fetch user data
  const { user, error } = useFetchUserComment(comment)

  const handleEdit = async () => {
    setIsEditing(true)
    setEditedContent(comment.content)
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      })

      if (res.ok) {
        // Call onEdit to update the comment in the parent state
        onEdit(comment, editedContent)
        setIsEditing(false) // Close the edit mode
        onSuccess()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className='text-xs text-gray-500'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className='mb-2'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className='text-gray-500 pb-2'>{comment.content}</p>
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
              <button
                type='button'
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className='text-sm' />
              </button>
              <p className='text-gray-400'>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "Like" : "Likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    type='submit'
                    className='text-gray-400 hover:text-blue-500'
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Comment
