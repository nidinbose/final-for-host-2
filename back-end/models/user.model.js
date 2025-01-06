import mongoose, { Mongoose, model } from "mongoose";

const userSchema= new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String},
    username:{type:String},
    role:{type:String},
    photo:{type:String},
    otp:{type:String},
    newPassword:{type:String}
   
})

export default mongoose.model.users || mongoose.model('user',userSchema)