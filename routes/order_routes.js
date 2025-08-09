import express from "express"
import { createOrder, paymentStatus, showAllOrders, showOrder, cancelOrder } from "../controller/order_controller.js"
import { userMiddleware } from "../middleware/user_middleware.js"
import { adminMiddleware } from "../middleware/admin_middleware.js"
const router = express.Router()

router.get("/showAllOrders",adminMiddleware, showAllOrders)
router.patch("/paymentStatus/:id",adminMiddleware, paymentStatus)

router.use(userMiddleware)

router.post("/createOrder", createOrder)
router.get("/showOrder/:id", showOrder)
router.delete("/cancelOrder/:id", cancelOrder)

export default router
