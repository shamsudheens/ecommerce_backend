import express from "express"
import {login,logout,userstatus} from "../controller/admin_controller.js"

const router=express.Router()

router.get("/login",login)
router.get("/logout",logout)
router.patch("/userstatus/:id",userstatus)

export default router