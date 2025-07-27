import express from "express"
import { createOrder, paymentStatus, showAllOrders, showOrder, cancelOrder } from "../controller/order_controller.js"
import { userMiddleware } from "../middleware/user_middleware.js"
const router = express.Router()


router.use(userMiddleware)

router.post("/createOrder", createOrder)
router.patch("/paymentStatus/:id", paymentStatus)
router.get("/showAllOrders", showAllOrders)
router.get("/showOrder/:id", showOrder)
router.delete("/cancelOrder/:id", cancelOrder)

export default router

console.log("hello");
