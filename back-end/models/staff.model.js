

import mongoose, { Mongoose, model } from "mongoose";

const staffSchema= new mongoose.Schema({
  

    name: { type: String},
    staffid: { type: String},
    experience: { type: String},
    qualification: { type: String},
    department:{ type:String},
    semester: { type: String},
    bloodType: { type: String  },
    dateOfBirth: { type: String },
    photo: { type: String }
   
})

export default mongoose.model.staff || mongoose.model('staff',staffSchema)