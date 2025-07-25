import bcrypt from "bcrypt"
import adminModel from "../models/admin.js"
import userModel from "../models/user.js"
import orderModel from "../models/order.js"

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await adminModel.findOne({ email })
        if (!user) {
            return res.json({ message: "email not found" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({ message: "incorrect password" })
        }
        req.session.adminid = user._id;
        return res.json({ message: "welcome Admin..." })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

export const logout = async (req, res) => {

    req.session.adminid = null;
    if (req.session.adminid !== null) {
        return res.status(404).json({ message: "logout failed" })
    }
    else {
        return res.status(200).json({ message: "logout successfull" })
    }
}


export const userstatus = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await userModel.findByIdAndUpdate(id, {
            status: req.body.status
        })
        if (!data) {
            return res.status(404).json({ message: "user not found" })
        }
        else {
            return res.status(200).json({ message: "status updated successfully" })
        }
    }
    catch (err) {
        return res.status(400).json({ message: "Internal server error" })
    }
}

export const shippingstatus = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await orderModel.findByIdAndUpdate(id, {
            shippingStatus: req.body.shippingStatus
        })
        if (!data) {
            return res.status(404).json({ message: "order not found" })
        }
        else {
            return res.status(200).json({ message: "shipping status updated successfully" })
        }
    }
    catch (err) {
        console.log(err);

        return res.status(400).json({ message: "Internal server error" })
    }
}