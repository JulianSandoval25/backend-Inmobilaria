import express from 'express';
import funciones  from '../controllers/user.js'
import middlewares  from '../middlewares/token.js'
const router = express.Router();

router.get('/users', middlewares.verifyTokenAdmin, funciones.getAll)
router.get('/user/:id', middlewares.verifyTokenAdmin, funciones.getByID)
router.delete('/user/:id', middlewares.verifyTokenAdmin, funciones.deleteById)
router.post('/createUser', funciones.createUser)
router.get('/login', funciones.login)
export default router ;