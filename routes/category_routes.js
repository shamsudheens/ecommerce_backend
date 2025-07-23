import express from "express"

import { addCategory,showCategory,editCategory,deleteCategory } from "../controller/category_controller.js"

const router=express.Router()

router.get("/showCategory/:id",showCategory)


router.use("/",(req,res,next)=>{
    if(req.session.adminid)next()
    else
    {
        return res.status(404).json({message:"Access denied"})
    }
})
router.post("/addCategory",addCategory)
router.put("/editCategory/:id",editCategory)
router.delete("/deleteCategory/:id",deleteCategory)



export default router
