import cartModel from "../models/cart.js"
import mongoose from "mongoose"

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body
        const userid = req.session.userid
        let cart = await cartModel.findOne({ userId: userid })

        if (cart) {
            let itemIndex = cart.items.findIndex(i => i.productId == productId)
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex]
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem
            }
            else {
                cart.items.push({ productId, quantity })
            }
            cart = await cart.save();
            return res.status(200).json(cart)
        }
        else {
            const newCart = await cartModel.create({
                userId: userid, items: [{ productId, quantity }]
            })
            return res.status(200).json(newCart)
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Internal server error")
    }
}


export const showCart = async (req, res) => {
    try {
        const userid = req.session.userid;

        const cart = await cartModel.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userid) }
            },
            {
                $unwind: "$items"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $project: {
                    _id: 0,
                    productId: "$items.productId",
                    name: "$productDetails.name",
                    price: "$productDetails.price",
                    image: "$productDetails.image",
                    quantity: "$items.quantity",
                    subtotal: {
                        $multiply: ["$items.quantity", "$productDetails.price"]
                    }
                }
            }
        ]);

        if (cart.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        const grandTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);


        return res.status(200).json({ items: cart, total: grandTotal });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const editCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const userid = req.session.userid
        let data = await cartModel.findOne({ userId: userid })
        if (data) {
            let productIndex = data.items.findIndex(i => i.productId == productId)
            if (productIndex > -1) {
                let productItem = data.items[productIndex]
                productItem.quantity = quantity;
                data.items[productIndex] = productItem
                await cartModel.updateOne({ userId: userid },
                    data
                )
                return res.status(200).json({ message: "cart updated successfully", data: data })
            }
            else {
                return res.status(400).json({ message: "Invalid Product Id" })
            }
        }
        else {
            return res.status(404).json({ message: "Cart not found" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" })
    }
}

export const deleteCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const userid = req.session.userid;

        const cart = await cartModel.findOne({ userId: userid });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();
        return res.status(200).json({ message: "Item removed", cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error removing item", error: err.message });
    }
};


export const deleteCart = async (req, res) => {
    const userid = req.session.userid
    try {
        const data = await cartModel.findOne({ userId: userid })
        {
            if (data) {
                await cartModel.deleteOne({ userId: userid })
                return res.status(200).json({ message: "Cart Deleted successfully" })
            }
            else {
                return res.status(404).json({ message: "No cart Found" })
            }
        }
    }
    catch (err) {
        console.log(err);

        return res.status(400).json({ message: "Internal Server Error" })
    }
}


// updates branch=> push => updateseeen main branchilott pull request vidnm
