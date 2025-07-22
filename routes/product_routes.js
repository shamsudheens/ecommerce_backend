import express from "express"
import multer from "multer"
import{addProduct,showProduct,editProduct,deleteProduct} from "../controller/product_controller.js"

const router=express.Router()


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


router.post("/addProduct",upload,addProduct)

router.put("/editProduct/:id",editProduct)
router.delete("/deleteProduct/:id",deleteProduct)

router.use("/",(req,res,next)=>{
    if(req.session.userid)next()
    else
    {
        return res.status(404).json({message:"Access denied"})
    }
})
router.get("/showProduct/:id",showProduct)

export default router