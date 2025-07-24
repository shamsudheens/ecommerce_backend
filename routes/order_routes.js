import express from "express"
import{createOrder} from "../controller/order_controller.js"

const router = express.Router()


router.use("/",(req,res,next)=>{
    if(req.session.userid)next()
    else
    {
        return res.status(404).json({message:"Access denied"})
    }
})
router.post("/createOrder",createOrder)


export default router