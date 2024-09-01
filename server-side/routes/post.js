import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import { post } from "../services/controller/post.js"


const router = express.Router()

router.post("/create", verifyToken, post)

export default router
