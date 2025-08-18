import express from "express"
import multer from "multer"
import{addProduct,showProduct,editProduct,deleteProduct,showAllProduct,searchProduct} from "../controller/product_controller.js"
import { adminMiddleware } from "../middleware/admin_middleware.js"
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

router.get("/showProduct/:id",showProduct)
router.get("/showAllProduct",showAllProduct)
router.get("/search/:query",searchProduct)

router.use(adminMiddleware)

router.post("/addProduct",upload,addProduct)
router.put("/editProduct/:id",upload,editProduct)
router.delete("/deleteProduct/:id",deleteProduct)




export default router