import bcrypt from "bcrypt"
import adminModel from "../models/admin.js"

export const login = async(req,res)=>{
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
        return res.json({ message: "welcome Admin..."})
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

export const logout = async(req,res)=>{
    req.session.destroy((err)=>{
        if(err)
        {
            return res.status(404).send({message:"logout failed"})
        }
        else
        {
            return res.status(404).send({message:"logout successfull"})
        }
    })
}