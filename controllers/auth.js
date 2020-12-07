const { response } = require('express')
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { verify } = require('../helpers/google-verify');



const login = async(req, res = response) => {


    const { email, password } = req.body;

    try {

        //verificar email

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            })
        }


        //verificar contra
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña no valida'
            })
        }


        //generar el token 

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })

    }



}

const googleSignIn = async(req, res = response) => {

    const googletoken = req.body.token;

    try {


        const { name, email, picture } = await verify(googletoken)

        //verificar si email ya existe
        const usuarioDB = await Usuario.findOne({ email })
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        //guardar en BD
        await usuario.save();

        const token = await generarJWT(usuario.id);



        res.json({
            ok: true,
            msg: 'google Signin',
            token
        })

    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: 'token no es correcto'
        })

    }


}


module.exports = {
    login,
    googleSignIn
}