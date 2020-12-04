const mongoose = require('mongoose')

//para compass
//mean_user29
//mean_user

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log('DB online')

    } catch (error) {
        console.log(error)
        throw new Error('error en la BD')
    }

}


module.exports = {
    dbConnection
}