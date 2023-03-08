import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import FuncionUpload from '../middlewares/uploadImg.js'
import multer from 'multer';

const getAll = async (req, res) => {
	try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;
    const filters = {};
    if (req.query.role) {
      filters.role = req.query.role;
    }
    let usuarios = await userModel.find(filters, req.query.fields)
      .sort({ createdAt: -1 })
      .skip(skipIndex)
      .limit(limit)
      .exec();
    res.status(200).json({
      usuarios
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al obtener usuarios'
    });
  }
};

const getByID = async (req, res) => {
  const userId = req.params.id; // Obtener el id del registro a eliminar
  try {
    const user = await userModel.findById(userId); // Busca usuario por Id
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

const deleteById = async (req, res) => {
  const id = req.params.id; // Obtener el id del registro a eliminar
  try {
    const result = await userModel.deleteOne({ _id: id }); // Eliminar el registro
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el Usuario" });
  }
};

const createUser = async (req, res) => {
  //Middlewares para subir foto de perfil de usuario
  FuncionUpload.upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err })
    } else if (err) {
      return res.status(500).json({ error: err })
    }
    const { email, password, telefono, role } = req.body;
    try{
      //Hash pasword
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      // Creacion de Usuario
      const user = new userModel({
        email,
        password: hashPassword,
        telefono,
        foto: req.file ? req.file.filename : 'usuario.png',
        fotoPath: req.file ? req.file.path.replace(/\\/g, '/') : 'src/uploads/usuario.png',
        role,
      });
      await user.save();
      // Genera un token de sesión para el usuario
      const token = jwt.sign({'_id' : user._id}, process.env.JWT_SECRET);

      res.status(201).json({ 
        message: 'Usuario creado',
        token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Error al obtener usuarios'
      });
    }
  })
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Busca al usuario por su email
    const user = await userModel.findOne({ email });

    // Si no se encuentra el usuario, devuelve un error
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, devuelve un error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    // Genera un token de sesión para el usuario
    const adminToken = jwt.sign({id : user._id, role: user.role}, process.env.JWT_SECRET);

    res.status(200).json({ 
      message: 'Credenciales válidas',
      adminToken
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export default {getAll, getByID, deleteById, createUser, login};