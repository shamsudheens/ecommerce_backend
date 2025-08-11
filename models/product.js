import { strict } from "assert";
import mongoose, { mongo } from "mongoose"
const schema=mongoose.Schema;
const productschema= new schema({
    name:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'categories'
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})

const productModel =mongoose.model("products",productschema)

export default productModel