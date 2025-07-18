import { strict } from "assert";
import mongoose, { mongo } from "mongoose"
const schema=mongoose.Schema;
const userschema = new schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    image:{
        type:String,
        require:true
    }
})

const userModel =mongoose.model("users",userschema)

export default userModel