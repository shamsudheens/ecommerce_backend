import { strict } from "assert";
import mongoose, { mongo } from "mongoose"
const schema=mongoose.Schema;
const adminschema= new schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
})

const adminModel =mongoose.model("admin",adminschema,"admin")

export default adminModel