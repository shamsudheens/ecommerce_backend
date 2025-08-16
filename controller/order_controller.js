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

            return res.status(200).json({
                message: "Order Placed Successfully",
                order: newOrder,
                success: true
            });
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
            return res.status(200).json({ message: "Payment status updated successfully", data: data })
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
        const data = await orderModel.find().populate("userId", "name").populate("items.productId", "name");
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

export const showOrder = async (req, res) => {
    try {
        const data = await orderModel
            .findById(req.params.id)
            .populate("items.productId", "name image price"); // populate specific fields

        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.shippingStatus.toLowerCase() !== "pending") {
            return res.status(400).json({ message: "Only pending orders can be cancelled" });
        }

        await orderModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: "Order cancelled successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const showUserOrders = async (req, res) => {
    try {
        if (!req.session.userid) {
            return res.status(401).json({ message: "Please login to view your orders" });
        }

        const userOrders = await orderModel
            .find({ userId: req.session.userid })
            .populate("items.productId", "name")
            .sort({ createdAt: -1 }); 

        if (userOrders.length === 0) {
            return res.status(404).json({ message: "You have no orders yet" });
        }

        return res.status(200).json(userOrders);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};