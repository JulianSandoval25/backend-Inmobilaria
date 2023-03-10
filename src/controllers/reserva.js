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
    let reservas = await reservaModel.find(filters, req.query.fields)
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
      //await reserva.save();
      
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

};

const getByIdPropietario = async (req, res) => {

};

const deleteById = async (req, res) => {

};

export default {getAll, createReserva, getByID, getByIdPropietario,  deleteById};