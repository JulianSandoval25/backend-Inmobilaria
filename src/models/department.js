import { mongoose } from 'mongoose';
//import Ubicacion from './location.js'
//import Comment from './comment.js'

const departmentSchema = new mongoose.Schema({
  propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fotos: [{ type: String, required: false }],
  fechaPublicacion: { type: Date, required: true, default: Date.now },
  disponible: { type: Boolean, required: true, default: true },
  tipo: { type: String, required: true, enum: ['venta', 'alquiler'] },
  calle:{type: String, required: true},
  ciudad:{type: String, required: true},
  provincia:{type: String, required: true},
  codigoPostal:{type: String, required: true},
  pais:{type: String, required: true}
  //comentarios: [Comment]
},{
    timestamps:true,
    versionKey:false
});
const Department = mongoose.model('Department', departmentSchema);

export default Department ;