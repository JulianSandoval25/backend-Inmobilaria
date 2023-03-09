import deparmentModel from '../models/department.js'
import FuncionUpload from '../middlewares/uploadImg.js'
import multer from 'multer';

const getAll = async (req, res) => {
	try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;
		//Creacion de filtros
    let filters = {};
    if (req.query.ciudad || req.query.provincia || req.query.pais) {
      filters = { 
				'ubicacion.ciudad': req.query.ciudad,
				'ubicacion.provincia': req.query.provincia,
				'ubicacion.pais': req.query.pais,
			};
    }
		//Busca departamentos
    let departamentos = await deparmentModel.find(filters, req.query.fields)
      .sort({ createdAt: -1 })
      .skip(skipIndex)
      .limit(limit)
      .exec();
    res.status(200).json({
      departamentos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener departamentos'
    });
  }
};

const createDepartment = async (req, res) => {
	try{
		//Creacion de departamento
		const { tipo, ubicacion } = req.body;
		const newDepartment = new deparmentModel({
			propietario: req.userID,
			tipo,
			ubicacion
		});
		newDepartment.save();
		res.status(201).json({ 
			message: 'Departemento creado creado',
			newDepartment
		});
	} catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Error al crear departamento'
      });
    }
	
};

const getByID = async (req, res) => {
  const departmentId = req.params.id; // Obtener el id del departamento
  try {
    const deparment = await deparmentModel.findById(departmentId); // Busca usuario por Id
    if (!deparment) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.status(200).json({ deparment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Departamento' });
  }
};

const getByIdPropietario = async (req, res) => {
  const propietarioID = req.userID; // Obtener el id del usuario
  try {
    const deparments = await deparmentModel.find({propietario: propietarioID}); // Busca usuario por Id
    if (!deparments) {
      return res.status(404).json({ error: 'Departamento no encontrado' });
    }
    res.status(200).json({ deparments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Departamento por id de propietario' });
  }
};

const deleteById = async (req, res) => {
	const id = req.params.id; // Obtener el id del registro a eliminar
  try {
    const result = await deparmentModel.deleteOne({ _id: id }); // Eliminar el registro
    res.status(200).json({ message: "Departamento eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el Departamento" });
  }
};

export default {getAll, getByID, getByIdPropietario, createDepartment, deleteById};