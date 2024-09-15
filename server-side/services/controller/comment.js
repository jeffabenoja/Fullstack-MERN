import { errorHandler } from "../../utils/error.js"
import Comment from "../../models/comment.js"

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body

    if (userId !== req.user.id) {
      return next(errorHandler(403, "You are not allowed to comment"))
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    })

    await newComment.save()
    res.status(200).json(newComment)
  } catch (error) {
    next(error)
  }
}

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
    }).sort({
      createdAt: -1,
    })
    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId)

    if (!comment) {
      return next(errorHandler(404, "Comment not found"))
    }

    // check if user is already exists in likes array.
    const userIndex = comment.likes.indexOf(req.user.id)

    // if user not found in likes array it would return -1
    // therefore indicating that this is the new user liking the comment
    // otherwise if user found remve this user from likes array and decrement the number of likes.
    if (userIndex === -1) {
      comment.numberOfLikes += 1
      comment.likes.push(req.user.id)
    } else {
      comment.numberOfLikes -= 1
      comment.likes.splice(userIndex, 1)
    }

    await comment.save()
    res.status(200).json(comment)
  } catch (error) {
    next(error)
  }
}

export const editComment = async (req, res, next) => {
  try {
    // Get the comment
    const comment = await Comment.findById(req.params.commentId)

    // Check if comment exists
    if (!comment) {
      return next(errorHandler(404, "Comment not found"))
    }

    // Check if user is allowed to edit the comment
    if (comment.userId !== req.user.id && !req.user.isAdmin === false) {
      return next(errorHandler(403, "You are not allowed to edit this comment"))
    }

    // Edit the comment
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    )

    res.status(200).json(editedComment)
  } catch (error) {
    next(error)
  }
}
