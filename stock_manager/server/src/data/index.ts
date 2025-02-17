import {exit} from 'node:process'
import db from '../config/db'


const clearDB = async () => {
    try{
        await db.sync({force: true}) //borra la base de datos
        console.log('Datos eliminados correctamente')
        exit(0) //exit finalizado correctamente
    } catch (error) {
        console.log(error)
        exit(1) // exit pero ha habido algun problema
    }
}

if(process.argv[2] === '--clear') {
    clearDB()
}