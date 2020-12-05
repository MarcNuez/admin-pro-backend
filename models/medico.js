const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

}, { collection: 'medicos' })

//hago referencia al ususchema con esta function por eso el this., le extraigo lo que quiero del objeto, se lo cambio y lo retorno
MedicoSchema.method('toJSON', function() {
    const { __v, ...Object } = this.toObject();

    return Object;
})


module.exports = model('Medico', MedicoSchema);