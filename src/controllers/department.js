import deparmentModel from '../models/department.js'
import FuncionUpload  from '../middlewares/uploadDeparment.js'
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
				'ciudad': req.query.ciudad,
				'provincia': req.query.provincia,
				'pais': req.query.pais,
			};
    }
		//Busca departamentos
    let departamentos = await deparmentModel.find(filters, req.query.fields).populate('propietario')
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
  FuncionUpload.upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        error: 'Error al cargar imágenes', 
      });
    } else if (err) {
      return res.status(500).json({
        error: 'Error al cargar imágenes', 
      });
    }
    try{
      //Creacion de departamento
      const { tipo, calle, ciudad, provincia, codigoPostal, pais } = req.body;
      let fotos=[] //para crear departamentos sin imagenes
      if(req.files){
        fotos = req.files.map(file => file.path.replace(/\\/g, '/')); // Obtén las rutas de las imágenes
      }
      const newDepartment = new deparmentModel({
        propietario: req.userID,
        tipo,
        fotos,
        calle, 
        ciudad, 
        provincia, 
        codigoPostal, 
        pais
      });
      await newDepartment.save();
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
  }
)};

const getByID = async (req, res) => {
  const departmentId = req.params.id; // Obtener el id del departamento
  try {
    // Busca usuario por Id
    const deparment = await deparmentModel.findById(departmentId)
      .populate('propietario')
      .sort({ createdAt: -1 }); 
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
    // Busca usuario por Id
    const deparments = await deparmentModel.find({propietario: propietarioID})
      .populate('propietario')
      .sort({ createdAt: -1 }); 
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