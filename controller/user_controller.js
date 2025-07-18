import userModel from "../models/user.js"
import bcrypt from "bcrypt"




export const signup =async(req,res)=>{

    try{
        const{name,phone,email,password}=req.body;
        const salt=10;
        const hashedPassword=await bcrypt.hash(password,salt)
        const user= new userModel({
            name,phone,email,password:hashedPassword,image:req.filename
        })
        await user.save()
        res.status(200).json({ message: "Submitted succesfully", success: true })
    }
    catch(err){
        res.json({ message: err.message})
    }
}