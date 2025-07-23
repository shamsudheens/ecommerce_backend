import cartModel from "../models/cart.js"
import productModel from "../models/product.js"
import mongoose from "mongoose"

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body
        const userid = req.session.userid
        let cart =await cartModel.findOne({userId:userid})

        if(cart)
        {
            let itemIndex=cart.items.findIndex(i=>i.productId==productId)
            if(itemIndex>-1){
                let productItem= cart.items[itemIndex]
                productItem.quantity+=quantity;
                cart.items[itemIndex]=productItem
            }
            else
            {
                cart.items.push({productId,quantity})
            }
            cart= await cart.save();
            return res.status(200).send(cart)
        }
        else
        {
            const newCart=await cartModel.create({
                userId:userid,items:[{productId,quantity}]
            })
            return res.status(200).send(newCart)
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error")
    }
}