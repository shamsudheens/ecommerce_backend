import express from "express"
import { createOrder, paymentStatus, showAllOrders, showOrder, cancelOrder,showUserOrders } from "../controller/order_controller.js"
import { userMiddleware } from "../middleware/user_middleware.js"
import { adminMiddleware } from "../middleware/admin_middleware.js"
const router = express.Router()

router.get("/showAllOrders",adminMiddleware, showAllOrders)

router.use(userMiddleware)
router.patch("/paymentStatus/:id",userMiddleware, paymentStatus)
router.get("/userOrders", showUserOrders); 
router.post("/createOrder", createOrder)
router.get("/showOrder/:id", showOrder)
router.delete("/cancelOrder/:id", cancelOrder)

export default router
