import { strict } from "assert";
import mongoose, { mongo } from "mongoose"
const schema=mongoose.schema;
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
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})

const productModel =mongoose.model("products",productschema)

export default productModel