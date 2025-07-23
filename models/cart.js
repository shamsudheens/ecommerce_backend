import mongoose, { mongo } from "mongoose";

const schema = mongoose.Schema;

const cartSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            quantity: {
                type: Number,
                require: true
            },
            addedAt:{
                type:Date,
                require:true,
                default:Date.now()
            }
        }
    ],
    createdAt:{
        type:Date,
        require:true,
        default:Date.now()
    }
})

const cartModel = mongoose.model("carts", cartSchema)

export default cartModel