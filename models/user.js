import { strict } from "assert";
import mongoose, { mongo } from "mongoose"
const schema=mongoose.Schema;
const userschema = new schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
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