import mongoose from "mongoose";

const notifySchema= new mongoose.Schema({
    Subject:{type:String},
    Date:{type:String},
    Matter:{type:String},
    Type:{type:String},
})

export default mongoose.model.notify || mongoose.model("notifies",notifySchema)