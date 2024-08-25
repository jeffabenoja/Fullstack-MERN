import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"

// Load the environment variables into the application
dotenv.config()

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

app.use(express.json())

// Making the app listen on port 3000 and logging a message to confirm the server is running
app.listen(3000, () => {
  console.log(`Server is running on port 3000`)
})

app.use(`/api/user`, userRoutes)

// Adding a middleware
app.use(`/api/user`, userRoutes)
app.use(`/api/auth`, authRoutes)
