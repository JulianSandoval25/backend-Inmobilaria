import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telefono: { type: String, required: true },
  foto: { type: String, required: false },
  fotoPath: { type: String, required: false },
  role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' },
  departamentosPublicados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: false }]
},{
    timestamps:true,
    versionKey:false
});
const User = mongoose.model('User', userSchema);

export default User ;