import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
  semester: { type: Number },
  subjects: [
    {
      name: { type: String },  
      mark: { type: Number },  
    },
  ],
  studentid: { type: String },
});

export default mongoose.model.Mark || mongoose.model('Mark', marksSchema);

  