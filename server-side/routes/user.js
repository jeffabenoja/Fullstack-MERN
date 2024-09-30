import express from "express"
import {
  updateUser,
  deleteUser,
  signOut,
  getUsers,
  getUser,
} from "../services/controller/user.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

// Before calling the updateUser verify first the cookie token
router.put("/update/:userId", verifyToken, updateUser)
router.delete("/delete/:userId", verifyToken, deleteUser)
router.post("/signout", signOut)
router.get("/getusers", verifyToken, getUsers)
router.get("/:userId", getUser)

export default router
