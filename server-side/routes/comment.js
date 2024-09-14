import express from "express"
import { createComment, getComments } from "../services/controller/comment.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.post("/create", verifyToken, createComment)
router.get("/getComments/:postId", getComments)

export default router
