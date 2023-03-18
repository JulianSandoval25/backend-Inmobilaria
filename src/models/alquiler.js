import { mongoose } from 'mongoose';

const alquilerSchema = new mongoose.Schema({
  idDepartamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  duracionContrato: { type: Number, required: true },
  precioAlquiler: { type: Number, required: true },
  frecuenciaPagos: { type: String, required: true },
  deposito: { type: Number, required: true },
  fechaInicio: { type: Date, required: true, default: Date.now },
  fechaFin: { type: Date, required: true },
  estado: { type: String, required: true, enum: ['activo', 'terminado'], default: 'activo' }
},{
  timestamps: true,
  versionKey: false
});
const Alquiler = mongoose.model('Alquiler', alquilerSchema);

export default Alquiler;