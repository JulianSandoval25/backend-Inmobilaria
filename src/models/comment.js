import { mongoose } from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now }
},{
    timestamps:true,
    versionKey:false
});
const Comment = mongoose.model('Comment', commentSchema);

export default Comment ;