import express from "express"
import orderModel from "../models/order.js"
import cartModel from "../models/cart.js"
import productModel from "../models/product.js"

export const createOrder = async (req, res) => {
    try {
        const userid = req.session.userid
        const cart = await cartModel.findOne({ userId: userid })
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }
        else {
            let orderItem = []
            let totalAmount = 0;
            for (const i of cart.items) {
                const product = await productModel.findById(i.productId);
                if (!product) continue

                const subTotal = product.price * i.quantity
                totalAmount += subTotal

                orderItem.push({
                    productId: product._id,
                    price: product.price,
                    quantity: i.quantity,
                    subTotal: subTotal,
                })
            }
            const newOrder = new orderModel({
                userId: userid,
                items: orderItem,
                total: totalAmount,
            })
            await newOrder.save()

            await cartModel.findOneAndDelete({ userId: userid })

            return res.status(200).json({ message: "Order Placed Successfully" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const paymentStatus = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await orderModel.findByIdAndUpdate(id, {
            paymentStatus: req.body.paymentStatus
        })
        if (data) {
            return res.status(200).json({ message: "Payment status updated successfully" })
        }
        else {
            return res.status(404).json({ message: "Order not found" })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const showAllOrders = async (req, res) => {
    try {
        const data = await orderModel.find()
        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "Orders are empty" })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}