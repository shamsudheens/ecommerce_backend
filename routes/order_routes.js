import express from "express"
import { createOrder, paymentStatus, showAllOrders, showOrder, cancelOrder } from "../controller/order_controller.js"

const router = express.Router()


router.use("/", (req, res, next) => {
    if (req.session.userid) next()
    else {
        return res.status(403).json({ message: "Access denied" })
    }
})
router.post("/createOrder", createOrder)
router.patch("/paymentStatus/:id", paymentStatus)
router.get("/showAllOrders", showAllOrders)
router.get("/showOrder/:id", showOrder)
router.delete("/cancelOrder/:id", cancelOrder)

export default router