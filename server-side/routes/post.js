import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import {
  post,
  getPosts,
  deletePost,
  updatePost,
} from "../services/controller/post.js"

const router = express.Router()

router.post("/create", verifyToken, post)
router.get("/getposts", getPosts)
router.delete("/deleteposts/:postId/:userId", verifyToken, deletePost)
router.put("/updatepost/:postId/:userId", verifyToken, updatePost)

export default router
