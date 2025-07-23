import mongoose from "mongoose"
import userModel from "../models/user.js"
import bcrypt from "bcrypt"

export const login = async(req,res)=>{
    const{email,password}=req.body
    try{
        const user=await userModel.findOne({email})
        if(!user)
        {
            return res.json({message:"email not found"})
        }
        const match=await bcrypt.compare(password,user.password)
        if(!match){
            return res.json({message:"incorrect password"})
        }
        
        if(user.role==true)
        {
            req.session.adminid=user._id;
            return res.json({message:"welcome admin...",type:"admin"})
        }
        if(user.role==false)
        {
            req.session.userid=user._id;
            if(user.status=="active")
                return res.json({message:"welcome user...",type:"user"})
            else
                return res.json({message:"your account has not been activated yet"})
        }
        return res.json({message:"Access denied please register first"})
    }
    catch(err)
    {
        res.json({message:err.message})
    }
}