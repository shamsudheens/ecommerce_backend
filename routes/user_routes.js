import express from "express"
import { signup } from "../controller/user_controller.js"


const upload = multer({
    storage: storage
}).single('image')
router.post("/signup", upload, signup)


export default router