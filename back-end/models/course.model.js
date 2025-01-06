import mongoose from "mongoose";

const courseSchema=new mongoose.Schema({
    photo:{type:String},
    title:{type:String},
    description:{type:String},
    fees:{type:Number},
    year:{type:Number},
    head:{type:String}
})

export default mongoose.model.courses || mongoose.model("course",courseSchema)