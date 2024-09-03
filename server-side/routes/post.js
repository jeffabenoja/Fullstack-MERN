import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import { post, getPosts, deletePost } from "../services/controller/post.js"

const router = express.Router()

router.post("/create", verifyToken, post)
router.get("/getposts", getPosts)
router.delete("/deleteposts/:postId/:userId", verifyToken, deletePost)

export default router
