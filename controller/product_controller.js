import express from "express"
import productModel from "../models/product.js"

export const addProduct = async(req,res)=>{
    try{
        const { name, brand,category,description,price,image } = req.body;
        const product = new productModel(
            {
                name, brand,category,description,price,image:req.filename
            }
        )
        await product.save()
        return res.status(200).send({message:"product added successfully",success:true,data:product})
    }
    catch(err){
        res.json({ message: err.message })
    }
}

export const showProduct = async(req,res)=>{
    try{
        const data= await productModel.findById(req.params.id,{category:0,__v:0})
        if(!data)
        {
            return res.json({message:"product not found"})
        }
        return res.json(data)
    }
    catch(err){
        res.status(500).json({message:"internal sever error"})
        console.log(err);
    }
}

export const editProduct = async(req,res)=>{
    try{
        const { name, brand,category,price,description,image}=req.body;
        const product=await productModel.findByIdAndUpdate(req.params.id,{
            name, brand,category,price,description,image:req.filename
        })
        if(!product)
        {
            return res.status(404).json({message:"Product not Found"})
        }
        else
        {
            return res.status(200).json({message:"Product updated successfully",data:product})
        }
    }
    catch(err)
    {
        res.status(404).json({message:"Internal server error"})
        console.log(err);
        
    }
}

export const deleteProduct = async(req,res)=>{
    try{
        const data =await productModel.findByIdAndDelete(req.params.id)
        if(!data)
        {
            return res.status(404).json({message:"product not found"})
        }
        else
        {
            return res.status(200).json({message:"product deleted successfully"})
        }
    }
    catch(err)
    {
        return res.status(400).json({message:"Internal Server error"})
    }
}


export const showAllProduct = async (req, res) => {
    try {
        const data = await productModel.find({}, { __v: 0 }).populate('category', 'name');
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Products are empty" });
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
