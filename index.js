const express = require('express')
require('dotenv').config();
const cors = require('cors')


const { dbConnection } = require('./database/config')

//crear el servidor express
const app = express();

//BD connection
dbConnection();


//config cors

app.use(cors())

//lectura del body el parseo bueno
app.use(express.json())




//rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))







app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en puerto' + 3000)
})