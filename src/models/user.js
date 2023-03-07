import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telefono: { type: String, required: true },
  foto: { type: String, required: false },
  fotoPath: { type: String, required: false },
  role: { type: String, required: true, enum: ['admin', 'user'] }
},{
    timestamps:true,
    versionKey:false
});
const User = mongoose.model('User', userSchema);

export default User ;