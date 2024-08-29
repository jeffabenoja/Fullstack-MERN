import { errorHandler } from "../../utils/error.js"
// Import bcryptjs for hashing passwords
import bcryptjs from "bcryptjs"
import User from "../../models/user.js"

export const test = (req, res) => {
  res.json({ message: `API is working` })
}

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user!"))
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }

  if (req.body.username) {
    const username = req.body.username

    const user = await User.findOne({ username })
    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      )
    }

    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"))
    }

    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"))
    }

    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      )
    }

    if (user) {
      return next(errorHandler(400, "Username already existed"))
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    )
    const { password, ...rest } = updatedUser._doc
    res.status(200).json(rest)
  } catch (error) {
    next(errorHandler(error))
  }
}
