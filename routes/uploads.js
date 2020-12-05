//ruta:/api/upload/



const { Router } = require('express');
const expressFileUpload = require('express-fileupload')
const { fileUpload, verImagen } = require('../controllers/uploads');
const { validarJWT } = require('../helpers/validar-jwt');


const router = Router();

router.use(expressFileUpload())

router.put('/:tipo/:id', [
    validarJWT

], fileUpload)
router.get('/:tipo/:foto', verImagen)












module.exports = router