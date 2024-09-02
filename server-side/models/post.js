import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fblogging%2F&psig=AOvVaw2Ewcosw8VpeJpy_QF-XXbv&ust=1725369021787000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMiT6c-qpIgDFQAAAAAdAAAAABAE",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const Post = mongoose.model("Post", postSchema)

export default Post
