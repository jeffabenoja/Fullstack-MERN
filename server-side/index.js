import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import postRoute from "./routes/post.js"
import cookieParser from "cookie-parser"

// Load the environment variables into the application
dotenv.config() // This loads the environment variables from the .env file into process.env

// Connecting to the MongoDB database using the connection string stored in the environment variable
mongoose
  .connect(process.env.MONGOOSE_API_KEY) // The MONGOOSE_API_KEY is fetched from the .env file
  .then(() => {
    // If the connection is successful, this message will be logged
    console.log(`Connected to your Database`)
  })
  .catch((error) => {
    // If the connection fails, the error is logged
    console.log(error)
  })

// Creating an instance of the express application
const app = express()

// Middleware to parse incoming JSON requests
app.use(express.json())

// Initializing the cookies
app.use(cookieParser())

// Start the server, listening on port 3000, and log a message when it's running
app.listen(3000, () => {
  console.log(`Server is running on port 3000`)
})

// Using user routes for handling requests to '/api/user' endpoint
app.use(`/api/user`, userRoutes)

// Using authentication routes for handling requests to '/api/auth' endpoint
app.use(`/api/auth`, authRoutes)

// Using post routes to for handling requests to '/api/post' endpoint
app.use("/api/post", postRoute)

// Middleware to handle errors. If any route or middleware throws an error, it will be caught here.
// `err` is the error object, and the middleware will send a structured JSON response with error details.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500 // Default to 500 if no status code is provided
  const message = err.message || "Internal Server Error" // Default error message if none is provided
  res.status(statusCode).json({
    success: false, // Indicating that the request was not successful
    statusCode, // Sending back the status code of the error
    message, // Sending back the error message
  })
})
