// Importing the User model from the specified path
import User from "../../models/user.js"
// Importing bcryptjs for password hashing
import bcryptjs from "bcryptjs"
// Importing the errorHandler utility function
import { errorHandler } from "../../utils/error.js"
// Importing jsonwebtoken for token generation
import jwt from "jsonwebtoken"

// Exporting the register function as an asynchronous function
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
    // Hashing the password using bcryptjs with a salt round of 10
    const encryptPassword = bcryptjs.hashSync(password, 10)

    // Creating a new user instance with the provided username, email, and hashed password
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
    // Passing any errors to the next middleware
    next(error)
  }
}

// Exporting the login function as an asynchronous function
export const login = async (req, res, next) => {
  // Extracting email and password from the request body
  const { email, password } = req.body

  // Checking if any of the required fields are missing or empty
  if (!email || !password || email === "" || password === "") {
    // If any field is missing, return a 400 error with a message
    next(errorHandler(400, "All fields are required"))
  }

  try {
    // Finding a user in the database with the provided email
    const validUser = await User.findOne({ email })

    // Delete this Soon
    console.log(json(validUser))

    // If no user is found, return a 404 error with a message
    if (!validUser) {
      return next(errorHandler(404, `User not Found`))
    }

    // Comparing the provided password with the stored hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password)

    // If the password is invalid, return a 404 error with a message
    if (!validPassword) {
      return next(errorHandler(404, "Invalid Password"))
    }

    // Generating a JWT token with the user's ID and a secret key
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET_KEY
    )

    // Destructuring the 'password' field from 'validUser._doc' and renaming it to '_password',
    // while collecting the remaining fields into the 'rest' object
    const { password: _password, ...rest } = validUser._doc

    // Sending a response back to the client with the token and a success message
    // Using 'rest' to exclude the password from the response for security reasons
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest)
  } catch (error) {
    // Passing any errors to the next middleware
    next(error)
  }
}
