import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema({
  name: { type: String},
  studentid: { type: String},
  Class: { type: String},
  department: { type: String },
  semester: { type: String},
  bloodType: { type: String },
  dateOfBirth: { type: String },
  email: { type: String },
  photo: { type: String },

});

export default mongoose.models.student || mongoose.model('student', studentsSchema);
