/* import { mongoose } from 'mongoose';

const ubicacionSchema = new mongoose.Schema({
  direccion: {
    calle: { type: String, required: true },
    ciudad: { type: String, required: true },
    estado: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    pais: { type: String, required: true },
  },
  coordenadas: {
    latitud: { type: Number, required: true },
    longitud: { type: Number, required: true },
  },
});

//const Ubicacion = mongoose.model('Ubicacion', ubicacionSchema);

export default Ubicacion ; */

class Ubicacion {
  constructor(calle, ciudad, provincia,codigoPostal, pais) {
    this.calle=calle;
    this.ciudad=ciudad;
    this.provincia=provincia;
    this.codigoPostal=codigoPostal;
    this.pais=pais;
  }
}

export default Ubicacion;