import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'

//cargar variables de entorno.
dotenv.config()


const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*.ts'],
    logging: false
}) // añade ?sll=true para evitar el error.

export default db