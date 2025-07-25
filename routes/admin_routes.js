import express from "express"
import {login,logout,userstatus,shippingstatus,showAllUsers} from "../controller/admin_controller.js"

const router=express.Router()

router.get("/login",login)
router.get("/logout",logout)

router.get("/",(req,res,next)=>{
    if(req.session.adminid)next()
    else
        return res.status(403).json({message:"Access only for admins"})
})

router.get("/showAllUsers",showAllUsers)
router.patch("/userstatus/:id",userstatus)
router.patch("/shippingstatus/:id",shippingstatus)

export default router