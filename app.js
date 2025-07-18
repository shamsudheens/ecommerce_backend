import express from "express"
import mongoose from "mongoose"
import adminRoutes from "./routes/admin_routes.js"
const app = express()

const dburl="mongodb://127.0.0.1:27017/ecommercebackend"

mongoose.connect(dburl).then(()=>{
    console.log("db connected");
    app.listen(3000)
})
