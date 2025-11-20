import express from "express"
import { checkAuth, login, signup, updateProfile } from "../controller/user.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const userRouter = express.Router()

userRouter.use("/signup", signup)
userRouter.use("/login", login)
userRouter.put("/update-profile", protectRoute, updateProfile)
userRouter.get("/check", protectRoute, checkAuth)


export default userRouter