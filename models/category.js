import { strict } from "assert";
import mongoose, { mongo } from "mongoose"
const schema=mongoose.Schema;
const categoryschema= new schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
})

const categoryModel =mongoose.model("categories",categoryschema)

export default categoryModel