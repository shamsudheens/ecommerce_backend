import express from "express"

import{addToCart} from "../controller/cart_controller.js"

const router=express.Router()

router.use("/",(req,res,next)=>{
    if(req.session.userid)next()
    else
        return res.status(403).json({message:"Access denied"})
})

router.post("/addToCart",addToCart)

export default router