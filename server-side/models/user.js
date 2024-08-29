import mongoose from "mongoose"

// Defining a schema for the 'User' collection in MongoDB using mongoose
const userSchema = new mongoose.Schema(
  {
    // Defining a field 'username' of type String
    // 'required: true' ensures this field must have a value
    // 'unique: true' ensures no two documents (users) have the same username
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
  },
  // This option automatically adds 'createdAt' and 'updatedAt' fields to the schema
  { timestamps: true }
)

// Creating a mongoose model named 'User' that will interface with the 'users' collection in MongoDB
// The model uses the defined 'userSchema' to structure the documents
const User = mongoose.model("User", userSchema)

// Exporting the 'User' model so it can be used in other parts of the application
export default User
