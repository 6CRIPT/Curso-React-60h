import express from "express";
import router from "./router";
import db from './config/db'
import colors from 'colors'

//Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate() //autenticarse en la base de datos
        db.sync() // sincronizar la base de datos para actualizarla
        console.log(colors.green.bold('Conexión exitosa a la BD'))

    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}
//conectar a la base de datos.
connectDB()

//instancia de express
const server = express() // funcion basica a la que añadir toda la config del proyecto

//Leer los datos de formularios
server.use(express.json()) //esta funcion nos habilita la lectura de JSONs por parte de nuestra api

//ROUTING puedes crear diferentes routers, como el de abajo, los que quieras
server.use('/api', router) //sirve para ejecutar todos los metodos de la API, pero si la petición es GET solo funcionará el GET y asi sucesivamente

server.get("/api/message", (req, res) => {
    res.json({msg: "Desde API"})
})

export default server