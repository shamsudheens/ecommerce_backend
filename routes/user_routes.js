import express from "express"
import { signup,getUserById,editUser } from "../controller/user_controller.js"
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

router.use("/",(req,res,next)=>{
    if(req.session.userid)next()
    else
    {
        return res.status(404).json({message:"Access denied"})
    }
})
router.get("/:id",getUserById)
router.put("/:id",upload,editUser)


export default router