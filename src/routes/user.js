import express from 'express';
import funciones  from '../controllers/user.js'
import middlewares  from '../middlewares/token.js'
const router = express.Router();

router.get('/users', middlewares.verifyTokenAdmin, funciones.getAll)
router.get('/user/:id', middlewares.verifyTokenUser, funciones.getByID)
router.delete('/user/:id', middlewares.verifyTokenAdmin, funciones.deleteById)
router.delete('/user/email/:email', middlewares.verifyTokenAdmin, funciones.deleteByEmail)
router.post('/createUser', funciones.createUser)
router.get('/login', funciones.login)
router.put('/updateUser', middlewares.verifyTokenUser, middlewares.verifyUserUpdate, (req, res)=>{res.status(200).json({ message: "Usuario actualizado" });})
export default router ;