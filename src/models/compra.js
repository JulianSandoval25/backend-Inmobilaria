import { mongoose } from 'mongoose';

const compraSchema = new mongoose.Schema({
  idDepartamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  idComprador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  precioVenta: { type: Number, required: true },
  formaPago: { type: String, required: true },
  pagosIniciales: { type: Number, required: true },
  plazoPago: { type: Number, required: true },
  fechaCierre: { type: Date, required: true },
  estado: { type: String, required: true, enum: ['activo', 'terminado'], default: 'activo' }
},{
  timestamps: true,
  versionKey: false
});
const Compra = mongoose.model('Compra', compraSchema);

export default Compra;