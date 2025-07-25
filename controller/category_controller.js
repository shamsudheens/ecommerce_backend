import categoryModel from "../models/category.js"
import productModel from "../models/product.js";
import userModel from "../models/user.js";
import mongoose from "mongoose";

export const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new categoryModel({ name, description })
        await category.save()
        res.status(200).json({ message: "Submitted succesfully", success: true,data:category })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

export const showCategory = async (req, res) => {
    try {
        const data = await categoryModel.findById(req.params.id, { __v: 0 })
        if (!data) {
            return res.json({ message: "category not found" })
        }
        return res.json(data)
    }
    catch (err) {
        res.status(500).json({ message: "internal sever error" })
        console.log(err);
    }
}


export const editCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        const data = await categoryModel.findByIdAndUpdate(req.params.id, {
            name, description
        })
        if (!data) {
            return res.status(404).json({ message: "category not found" })
        }
        return res.status(200).json({ message: "category updated successfully",data:data })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: "error occured while update" })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await productModel.deleteMany({ category: new mongoose.Types.ObjectId(req.params.id) });
        const category = await categoryModel.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(404).json({ message: "category not found" })
        }
        else {
            return res.status(200).json({ message: "category and  associated products are deleted" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Internal server error" })
    }
}

export const showAllCategory = async(req,res)=>{
    try{
        const data= await categoryModel.find({},{__v:0})
        if(!data)
        {
            return res.json({message:"categories are empty"})
        }
        return res.json(data)
    }
    catch(err){
        res.status(500).json({message:"internal sever error"})
        console.log(err);
    }
}