//ruta:/api/todo/:busqueda



const { Router } = require('express');
const { getBusqueda } = require('../controllers/busquedas');
const { validarJWT } = require('../helpers/validar-jwt');


const router = Router();


router.get('/:busqueda', [
    validarJWT

], getBusqueda)

router.get('/coleccion/:tabla/:busqueda', [
    validarJWT

], getBusqueda)











module.exports = router