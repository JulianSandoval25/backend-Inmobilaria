import reservaModel from '../models/reserva.js'

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;
    let filters = {};
    if (req.query.fecha) {
      filters = { 
				'fecha': req.query.fecha,
			};
    }
    let reservas = await reservaModel.find(filters, req.query.fields).populate('usuario').populate('propiedad')
      .sort({ createdAt: -1 })
      .skip(skipIndex)
      .limit(limit)
      .exec();
    res.status(200).json({
      reservas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener reservas'
    });
  }
};

const createReserva = async (req, res) => {
	try{
    const userId = req.userID;
		const {propiedad, fecha, hora}= req.body
    // Creacion de reserva
    const reserva = new reservaModel({
      usuario:userId,
			propiedad,
			fecha,
			hora,
    });
    await reserva.save();
      
    res.status(201).json({ 
      message: 'Reserva creada',
			reserva
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al crear reserva'
    });
  }
};


const getByID = async (req, res) => {
  const reservaID = req.userID; // Obtener el id de la reserva
  try {
    const reserva = await reservaModel.findById(reservaID).populate('usuario').populate('propiedad'); // Busca reserva por Id
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json({ reserva });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener reserva' });
  }
};

const getByIdUsuario = async (req, res) => {
  const userId = req.userID; // Obtener el id del usuario
  try {
    const reservas = await reservaModel.find({usuario:userId}).populate('usuario').populate('propiedad')
    if (!reservas) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json({ reservas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener reserva' });
  }
};

const getByIdPropietario = async (req, res) => {
  const idPropietario= req.userID
  reservaModel.find({}).populate('usuario').populate('propiedad').then((reservas) => {
    const reservasPropietario = reservas.filter((reserva) => {
      return reserva.propiedad.propietario._id.equals(idPropietario);
    });
    if (!reservasPropietario) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json({ reservasPropietario });
  }).catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener reserva' });
  });
};

const deleteById = async (req, res) => {
  const id = req.params.id; // Obtener el id del registro a eliminar
  try {
    const result = await reservaModel.deleteOne({ _id: id }); // Eliminar el registro
    res.status(200).json({ 
      message: "Reserva eliminada",
      result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el Reserva" });
  }
};


const UpdateReserva= async (req, res) =>{
   try {
    const reservaId = req.params.id;
    const updateData = req.body;
    // Verificar si la reserva existe
    const reserva = await reservaModel.findById(reservaId);
    if (!reserva) {
      return res.status(404).json({ message: 'La reserva no existe' });
    }
    
    // Actualizar reserva
    const reservaUpdate = await reservaModel.findByIdAndUpdate(reservaId, updateData);
    
    res.status(200).json({ message: 'Reserva actualizada', reserva: reservaUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el reserva' });
  }
}

export default {getAll, createReserva, getByID, getByIdPropietario,  deleteById, UpdateReserva, getByIdUsuario};