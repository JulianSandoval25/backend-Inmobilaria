import jwt from 'jsonwebtoken'

const verifyTokenAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      } else {
        if (decoded.role === 'admin') {
          // El usuario tiene el rol correcto, se permite el acceso a la ruta
          req.userID = decoded.id; //guarda ID para ser utilizado para validar update
          next();
        } else {
          return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Fallo en autentificacion!' });
  } 
}

const verifyTokenUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      } else {
        if (decoded.role === 'admin' || decoded.role === 'user' ) {
          // El usuario tiene el rol correcto, se permite el acceso a la ruta
          req.userID = decoded.id; //guarda ID para ser utilizado para validar update
          next();
        } else {
          return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Fallo en autentificacion!' });
  } 
}
//actualmente esta funcion no se utiliza, ya que se utiliza el id del token para actualizar
function verifyUserUpdate(req, res, next) {
  try{
    // Obtén el ID del usuario del token de autenticación
    const userId = req.userID;
    // Obtén el ID del usuario que se está tratando de actualizar de la solicitud
    const updateUser = req.body;
    const updateUserId = updateUser.id;
    // Verifica que los IDs de usuario coincidan
    if (userId != updateUserId) {
      // Si los IDs no coinciden, devuelve un error de acceso no autorizado
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    // Si los IDs coinciden, llama a la siguiente función de middleware
    next();
  }catch(err){
    console.log(err);
    res.status(401).json({ message: 'Fallo en autentificacion!' });
  }
}

export default {verifyTokenAdmin, verifyTokenUser, verifyUserUpdate};