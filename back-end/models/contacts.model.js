import mongoose from 'mongoose'

const contactSchema=new mongoose.Schema({

    Name:{type:String},
    Email:{type:String},
    Phone:{type:Number},
    Course:{type:String},
    Message:{type:String},
})

export default mongoose.model.contact || mongoose.model("contacts",contactSchema)