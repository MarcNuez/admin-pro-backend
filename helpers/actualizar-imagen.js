const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')

const fs = require('fs')



// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));





const borrarImagen = (path) => {


    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {


    switch (tipo) {
        case 'medicos':
            {
                const medico = await Medico.findById(id);
                if (!medico) {
                    console.log('no se encontro medico por id')
                    return false;
                }

                const pathViejo = `./uploads/medicos/${medico.img}`;
                borrarImagen(pathViejo)

                medico.img = nombreArchivo;
                await medico.save();
                return true;
            }


            break;

        case 'hospitales':

            {
                hospital = await Hospital.findById(id);
                if (!hospital) {
                    console.log('no se encontro hospital por id')
                    return false;
                }

                const pathViejo = `./uploads/hospitales/${hospital.img}`;
                borrarImagen(pathViejo)

                hospital.img = nombreArchivo;
                await hospital.save();
                return true;

            }
            break;

        case 'usuarios':
            {
                const usuario = await Usuario.findById(id);
                if (!usuario) {
                    console.log('no se encontro usuario por id')
                    return false;
                }

                const pathViejo = `./uploads/hospitales/${usuario.img}`;
                borrarImagen(pathViejo)

                usuario.img = nombreArchivo;
                await usuario.save();
                return true;
            }

            break;
    }

}


module.exports = {
    actualizarImagen
}