import { mongoose } from 'mongoose';

const reservaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propiedad: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  duracion: { type: Number, required: true },
  confirmada: { type: Boolean, default: false },
});

const Reserva = mongoose.model('Reserva', reservaSchema);

export default Reserva;