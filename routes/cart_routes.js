import express from "express"

import{addToCart,showCart,editCart,deleteCart} from "../controller/cart_controller.js"
import { userMiddleware } from "../middleware/user_middleware.js"
const router=express.Router()

router.use(userMiddleware)

router.post("/addToCart",addToCart)
router.get("/showCart",showCart)
router.put("/editCart",editCart)
router.delete("/deleteCart",deleteCart)

export default router