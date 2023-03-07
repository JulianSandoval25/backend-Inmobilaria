import express from 'express';
import funciones  from '../controllers/user.js'
import middlewares  from '../middlewares/token.js'
const router = express.Router();

router.get('/users', middlewares.verifyToken ,funciones.getAll)
router.get('/user/:id', funciones.getByID)
router.delete('/user/:id', funciones.deleteById)
router.post('/createUser', funciones.createUser)
router.get('/login', funciones.login)
export default router ;