import express from "express"

import { addCategory,showCategory,editCategory,deleteCategory } from "../controller/category_controller.js"

const router=express.Router()



router.post("/addCategory",addCategory)
router.put("/editCategory/:id",editCategory)
router.delete("/deleteCategory/:id",deleteCategory)


router.use("/",(req,res,next)=>{
    if(req.session.userid)next()
    else
    {
        return res.status(404).json({message:"Access denied"})
    }
})

router.get("/showCategory/:id",showCategory)

export default router
