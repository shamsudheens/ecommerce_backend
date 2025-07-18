import express from "express"
import { signup } from "../controller/user_controller.js"
import multer from "multer"
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const fileNameSplit = file.originalname.split(".");
        const fileName = fileNameSplit[fileNameSplit?.length - 1]

        req.filename = `${file.originalname}_${Date.now()}.${fileName}`
        cb(null, req.filename)
    }
})

const upload = multer({
    storage: storage
}).single('image')
router.post("/signup", upload, signup)


export default router