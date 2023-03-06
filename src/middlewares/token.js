import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Fallo en autentificacion!' });
  }
}

export default {verifyToken};