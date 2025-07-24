import express from "express"

import{addToCart,showCart,editCart,deleteCart} from "../controller/cart_controller.js"

const router=express.Router()

router.use("/",(req,res,next)=>{
    if(req.session.userid)next()
    else
        return res.status(403).json({message:"Access denied"})
})

router.post("/addToCart",addToCart)
router.get("/showCart",showCart)
router.put("/editCart",editCart)
router.delete("/deleteCart",deleteCart)

export default router