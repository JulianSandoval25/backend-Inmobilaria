import { mongoose } from 'mongoose';

const departmentSchema = new mongoose.Schema({
  propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fotos: [{ type: String, required: true }],
  fechaPublicacion: { type: Date, required: true, default: Date.now },
  comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false }]
},{
    timestamps:true,
    versionKey:false
});
const Department = mongoose.model('Department', departmentSchema);

export default Department ;