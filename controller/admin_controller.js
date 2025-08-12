import bcrypt from "bcrypt"
import adminModel from "../models/admin.js"
import userModel from "../models/user.js"
import orderModel from "../models/order.js"

export const login = async (req, res) => {
    console.log(req.body);
    
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
        return res.json({ message: "welcome Admin..." ,type:true,role: "admin"})
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
        return res.status(200).json({ message: "logout successfull" ,success:true})
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
            return res.status(200).json({ message: "status updated successfully",data:data,success:true })
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
            return res.status(200).json({ message: "shipping status updated successfully",data:data })
        }
    }
    catch (err) {
        console.log(err);

        return res.status(400).json({ message: "Internal server error" })
    }
}

export const showAllUsers = async(req,res)=>{
    try{
        const data= await userModel.find({},{__v:0,password:0})
        if(!data)
        {
            return res.status(404).json({message:"No users found"})
        }
        else
        {
            return res.status(200).json(data)
        }
    }
    catch(err){
        return res.status(500).json({message:"internal server error"})
    }
}