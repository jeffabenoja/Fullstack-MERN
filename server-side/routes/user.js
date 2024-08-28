import express from "express"
import { test, updateUser } from "../services/controller/user.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.get("/test", test)
// Before calling the updateUser verify first the cookie token
router.put('/update/:userId', verifyToken, updateUser);

export default router
