import express from "express"

import{addToCart,showCart,editCart,deleteCart,deleteCartItem} from "../controller/cart_controller.js"
import { userMiddleware } from "../middleware/user_middleware.js"
const router=express.Router()

router.use(userMiddleware)

router.post("/addToCart",addToCart)
router.get("/showCart",showCart)
router.put("/editCart",editCart)
router.delete("/deleteCart",deleteCart)
router.delete("/deleteCart/:productId", deleteCartItem);


export default router