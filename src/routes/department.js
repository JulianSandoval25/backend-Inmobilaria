import express from 'express';
import funciones  from '../controllers/department.js'
import middlewares  from '../middlewares/token.js'
const router = express.Router();

router.post('/department', middlewares.verifyTokenUser, funciones.createDepartment);
router.get('/department', middlewares.verifyTokenUser, funciones.getAll);
router.get('/department/:id', middlewares.verifyTokenUser, funciones.getByID);
router.get('/departmentpropietario', middlewares.verifyTokenUser, funciones.getByIdPropietario); // /department/propietario lo reconoce como /department/:id
router.put('/department/:id', middlewares.verifyTokenUser, funciones.UpdateDeparmento);
router.delete('/department/:id', middlewares.verifyTokenUser, funciones.deleteById);

export default router;