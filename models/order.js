import mongoose from "mongoose";

const schema = mongoose.Schema;

const orderSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"users"
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref:"products"
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            subTotal: {
                type: Number,
                required: true
            },
            addedAt: {
                type: Date,
                required: true,
                default: Date.now()
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    shippingStatus: {
        type: String,
        required: true,
        default: "pending"
    },
    paymentStatus: {
        type: String,
        required: true,
        default: "pending"
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const orderModel = mongoose.model("orders", orderSchema)

export default orderModel