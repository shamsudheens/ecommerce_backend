import express from "express"

import { addCategory,showCategory,editCategory,deleteCategory, showAllCategory } from "../controller/category_controller.js"

import { adminMiddleware } from "../middleware/admin_middleware.js"
const router=express.Router()

router.get("/showCategory/:id",showCategory)
router.get("/showAllCategory",showAllCategory)

router.use(adminMiddleware)

router.post("/addCategory",addCategory)
router.put("/editCategory/:id",editCategory)
router.delete("/deleteCategory/:id",deleteCategory)




export default router
