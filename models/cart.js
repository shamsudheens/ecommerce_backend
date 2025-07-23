import mongoose, { mongo } from "mongoose";

const schema = mongoose.Schema;

const cartSchema= new schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true,
    },
    total:{
        type:Number,
        require:true
    }
})

const cartModel = mongoose.model("carts",cartSchema)

export default cartModel