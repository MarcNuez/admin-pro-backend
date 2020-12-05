const { response } = require('express')
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getBusqueda = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');



    const [usuariosBuscados, hospitalesBuscados, medicosBuscados] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })

    ])


    res.json({
        ok: true,
        usuariosBuscados,
        hospitalesBuscados,
        medicosBuscados,
        busqueda
    })

}
const getDocumentosColeccion = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');

    //es un arreglo!
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })

            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })


            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex })

            break;

        default:
            res.status(400).json({
                ok: false,
                resultados: data
            })


    }

    res.json({
        ok: true,
        data
    })




}





module.exports = {
    getBusqueda,
    getDocumentosColeccion
}