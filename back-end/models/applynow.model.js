import mongoose from "mongoose";

const applynowSchema=new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    dob:{type:String},
    sex:{type:String},
    religion:{type:String},
    cast:{type:String},
    address:{type:String},
    pincode:{type:String},
    schoolName:{type:String},
    yearOfPassout:{type:String},
    aadharNo:{type:String},
    sslcRegistrationNumber:{type:String},
    higherSecondaryRegistrationNumber:{type:String},
    percentageHigherSecondary:{type:String},
    phone:{type:String},
    email:{type:String},
})

export default mongoose.model.applynow || mongoose.model("applynows",applynowSchema)