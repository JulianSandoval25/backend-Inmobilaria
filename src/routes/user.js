import express from 'express';
import funciones  from '../controllers/user.js'
import middlewares  from '../middlewares/token.js'
const router = express.Router();

router.get('/users', middlewares.verifyTokenAdmin, funciones.getAll);
router.get('/user/:id', middlewares.verifyTokenUser, funciones.getByID);
router.delete('/user/:id', middlewares.verifyTokenAdmin, funciones.deleteById);
router.delete('/user/email/:email', middlewares.verifyTokenUser, funciones.deleteByEmail);
router.post('/user', funciones.createUser);
router.post('/login', funciones.login);
router.put('/user', middlewares.verifyTokenUser, funciones.UpdateUser);
router.put('/userid/:id', middlewares.verifyTokenUser, funciones.UpdateUserById);
router.get('/user', middlewares.verifyTokenUser, funciones.getByToken);
export default router ;