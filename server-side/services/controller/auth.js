// Import the User model
import User from "../../models/user.js"
// Import bcryptjs for hashing passwords
import bcryptjs from "bcryptjs"
// Import a custom error handler utility
import { errorHandler } from "../../utils/error.js"
// Import jsonwebtoken for generating JWT tokens
import jwt from "jsonwebtoken"

// Register a new user
export const register = async (req, res, next) => {
  // Extract username, email, and password from the request body
  const { username, email, password } = req.body

  // Check if any required fields are missing
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"))
  }

  try {
    // Hash the password using bcrypt with a salt of 10 rounds
    const encryptPassword = bcryptjs.hashSync(password, 10)

    // Create a new user object with the hashed password
    const newUser = new User({
      username,
      email,
      password: encryptPassword,
    })

    // Save the new user to the database
    await newUser.save()

    // Send a success response to the client
    res.json("Register Successful")
  } catch (error) {
    // Pass any error to the next middleware for handling
    next(error)
  }
}

// Log in an existing user
export const login = async (req, res, next) => {
  // Extract email and password from the request body
  const { email, password } = req.body

  // Check if email and password are provided
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"))
  }

  try {
    // Look for a user in the database by email
    const validUser = await User.findOne({ email })

    // If no user is found, return an error
    if (!validUser) {
      return next(errorHandler(404, "User not found"))
    }

    // Check if the provided password matches the stored hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password)

    // If the password is incorrect, return an error
    if (!validPassword) {
      return next(errorHandler(404, "Invalid password"))
    }

    // Generate a JWT token using the user's ID
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET_KEY
    )

    // Exclude the password from the user object when sending a response
    const { password: _password, ...rest } = validUser._doc

    // Send the token and user data (excluding password) to the client
    res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest)
  } catch (error) {
    // Pass any error to the next middleware for handling
    next(error)
  }
}

// Handle Google OAuth login or registration
export const google = async (req, res, next) => {
  // Extract name, email, and Google profile picture URL from the request body
  const { name, email, googlePhotoUrl } = req.body

  try {
    // Look for a user in the database by email
    const user = await User.findOne({ email })

    // If the user exists, log them in
    if (user) {
      // Generate a JWT token using the user's ID
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY
      )

      // Exclude the password (even though Google users don't have passwords)
      const { password, ...rest } = user._doc

      // Send the token and user data (excluding password) to the client
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest)
    } else {
      // If the user doesn't exist, create a new user with a randomly generated password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        email +
        process.env.JWT_SECRET_KEY

      // Hash the randomly generated password
      const encryptPassword = bcryptjs.hashSync(generatedPassword, 10)

      // Create a new user with the provided Google info
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email: email,
        password: encryptPassword,
        profilePicture: googlePhotoUrl,
      })

      // Save the new user to the database
      await newUser.save()

      // Generate a JWT token using the user's ID
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET_KEY
      )

      // Exclude the password from the user data
      const { password: _password, ...rest } = newUser._doc

      // Send the token and user data (excluding password) to the client
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest)
    }
  } catch (error) {
    // Pass any error to the next middleware for handling
    next(error)
  }
}
