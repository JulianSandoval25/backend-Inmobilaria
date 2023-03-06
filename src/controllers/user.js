import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const getAll = async (req, res) => {
	try {
    const page = parseInt(req.query.page) || 1;
    console.log(page)
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;
    let usuarios = await userModel.find({}, req.query.fields)
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
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};


const createUser = async (req, res) => {
  const { email, password, telefono, foto, role } = req.body;
	try{
		//Hash pasword
		const saltRounds = 10;
		const hashPassword = await bcrypt.hash(password, saltRounds);
		// Creacion de Usuario
		const user = new userModel({
			email,
			password: hashPassword,
			telefono,
			foto,
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
    const token = jwt.sign({'_id' : user._id}, process.env.JWT_SECRET);

    res.status(200).json({ 
      message: 'Credenciales válidas',
      token
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export default {getAll, getByID, createUser, login};