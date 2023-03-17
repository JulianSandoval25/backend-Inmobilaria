import express from 'express';
import funciones  from '../controllers/reserva.js'
import middlewares  from '../middlewares/token.js'
const router = express.Router();

router.post('/reserva', middlewares.verifyTokenUser, funciones.createReserva);
router.get('/reserva', middlewares.verifyTokenUser, funciones.getAll);
router.get('/reservausuario', middlewares.verifyTokenUser, funciones.getByIdUsuario);
router.get('/reserva/:id', middlewares.verifyTokenUser, funciones.getByID);
router.put('/reserva/:id', middlewares.verifyTokenUser, funciones.UpdateReserva);
router.get('/reservapropietario', middlewares.verifyTokenUser, funciones.getByIdPropietario);
router.delete('/reserva/:id', middlewares.verifyTokenUser, funciones.deleteById);

export default router;