import mongoose  from "mongoose";

const userSChema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
export const User=mongoose.model("user",userSChema)  //after compliting the userschema we convert the schema in the modle so we can use this schema in another file
