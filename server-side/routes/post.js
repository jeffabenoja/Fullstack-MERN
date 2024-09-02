import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import { post, getPosts } from "../services/controller/post.js"

const router = express.Router()

router.post("/create", verifyToken, post)
router.get("/getPosts", getPosts)

export default router
