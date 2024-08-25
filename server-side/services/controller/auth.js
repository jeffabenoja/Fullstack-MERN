import User from "../../models/user.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../../utils/error.js"

export const register = async (req, res, next) => {
  // Extracting username, email, and password from the request body
  const { username, email, password } = req.body

  // Checking if any of the required fields are missing or empty
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // If any field is missing, return a 400 error with a message
    next(errorHandler(400, "All fields are required"))
  }

  try {
    const encryptPassword = bcryptjs.hashSync(password, 10)

    // Creating a new user instance with the provided username, email, and password
    const newUser = new User({
      username,
      email,
      password: encryptPassword,
    })
    // Saving the new user to the database using the 'save' method
    await newUser.save()
    // Sending a response back to the client confirming successful registration
    res.json(`Register Successful`)
  } catch (error) {
    next(error)
  }
}
