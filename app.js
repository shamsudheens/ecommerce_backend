import express from "express"
import mongoose from "mongoose"
import adminRoutes from "./routes/admin_routes.js"
import loginRoutes from "./routes/login_routes.js"
import userRoutes from "./routes/user_routes.js"
import categoryRoutes from "./routes/category_routes.js"
import productRoutes from "./routes/product_routes.js"
import cartRoutes from "./routes/cart_routes.js"
import orderRoutes from "./routes/order_routes.js"
import MongoStore from "connect-mongo"
import cors from "cors"
import session from "express-session"
import { ServerClosedEvent } from "mongodb"

const app = express()
const dburl="mongodb+srv://chechu:chechu@chechu.km04jpt.mongodb.net/chechu?retryWrites=true&w=majority&appName=chechu"
mongoose.connect(dburl).then(()=>{
    console.log("db connected");
    app.listen(3000)
})

app.use(express.static("uploads"))
app.use(express.json())


app.use(cors({
    origin: ["http://localhost:5173", "http://16.171.28.234"],
    credentials: true
}
))

app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:"hehehe",
    resave:false,
    saveUninitialized:false,
    cookie: { secure: false },
    store:MongoStore.create({mongoUrl:"mongodb+srv://chechu:chechu@chechu.km04jpt.mongodb.net/chechu?retryWrites=true&w=majority&appName=chechu"})
}))
app.use((req,res,next)=>{
    res.locals.message=req.session.message
    delete req.session.message
    next()
})
app.use("/api/admin",adminRoutes)
app.use("/api/login",loginRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)