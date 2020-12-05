//ruta: /api/usuarios

const { Router } = require('express')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../helpers/validar-jwt');
const { check } = require('express-validator')
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');


const router = Router();


router.get('/', validarJWT, getUsuarios)


router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos //a lo ultimo !
], crearUsuarios)

router.put('/:id', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('role', 'el role es obligatorio').isEmail(),
    // validarCampos //a lo ultimo !
], actualizarUsuario)
router.delete('/:id', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('role', 'el role es obligatorio').isEmail(),
    // validarCampos //a lo ultimo !
], borrarUsuario)



module.exports = router;