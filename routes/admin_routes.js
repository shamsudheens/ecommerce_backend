import express from "express"
import {login,logout,userstatus,shippingstatus,showAllUsers} from "../controller/admin_controller.js"
import { adminMiddleware } from "../middleware/admin_middleware.js"

const router=express.Router()

router.get("/login",login)


router.use(adminMiddleware)

router.get("/logout",logout)
router.get("/showAllUsers",showAllUsers)
router.patch("/userstatus/:id",userstatus)
router.patch("/shippingstatus/:id",shippingstatus)

export default router