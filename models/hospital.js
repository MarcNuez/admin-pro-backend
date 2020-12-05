const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,

    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales' })

//hago referencia al ususchema con esta function por eso el this., le extraigo lo que quiero del objeto, se lo cambio y lo retorno
HospitalSchema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();

    return Object;
})


module.exports = model('Hospital', HospitalSchema);