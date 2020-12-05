//ruta: '/api/medico'


const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../helpers/validar-jwt');
const { check } = require('express-validator');
const { actualizarMedico, crearMedico, getMedicos, borrarMedico } = require('../controllers/medicos');

const router = Router();


router.get('/', validarJWT, getMedicos)


router.post('/', [
    validarJWT,
    check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'el hospital tiene que ser valido').isMongoId(), validarCampos
], crearMedico)

router.put('/:id', [

], actualizarMedico)
router.delete('/:id', [

], borrarMedico)



module.exports = router;