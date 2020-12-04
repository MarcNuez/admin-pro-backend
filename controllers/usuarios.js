const { response } = require('express')
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario')

const { generarJWT } = require('../helpers/jwt')



const getUsuarios = async(req, res) => {
    //buscamos un usuario con algun filtro
    const usuarios = await Usuario.find({}, 'nombre email role google');


    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}



const crearUsuarios = async(req, res = response) => {

    const { email, password, nombre } = req.body;





    try {
        //verifico que no exista ese email
        const existeEmail = await Usuario.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'correo repetido'
            })
        }

        const usuario = new Usuario(req.body);


        //encriptar contra

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);



        //guardar usuario
        await usuario.save();

        const token = await generarJWT(usuario.id)



        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error inesperadooo'
        })


    }


}


const actualizarUsuario = async(req, res = response) => {

    //TODO: validar token !?!?!?!?
    const uid = req.params.id;

    try {

        //buscamos si el ususario existe por la id
        const usuarioDB = await Usuario.findById(uid);
        //si no existe respondemos error 400
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }



        //si existe extraemos los campos del body, y borramos los campos que no nos interesan
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email })
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un usuario con ese email'
                })

            }
        }

        campos.email = email;

        //buscamos el usuario por la id y lo actualizamos con lo que pasamos por el body
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });



        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }




}



const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {


        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                msg: 'usuario no existe'
            })
        }

        await Usuario.findByIdAndDelete(uid);



        res.json({
            ok: true,
            msg: 'usuario eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }




}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}