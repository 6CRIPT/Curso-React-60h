import { Request, Response } from "express"
import Product from "../models/Product.model"


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'ASC'] // que ordene por precio ascendente
            ],
            attributes: {
                exclude: [ //para excluir cosas de la consulta
                    'createdAt', 'updatedAt', 'availability'
                ]
            }
        }) // nos traemos todos los registros de la base de datos
        res.json({ data: products })
    } catch {

    }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        //console.log(req.params.id)
        const { id } = req.params
        const product = await Product.findByPk(id) //pk -> primary key

        if (!product) {
            res.status(400).json({
                error: 'Producto no encontrado'
            })
            return
        }
    } catch {

    }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => { // una función que modifique una base de DATOS SIEMPRE HA DE SER ASINCRONA. debe devolver una promise<void> por el sida de versionado, prueba con npm install --save-dev @types/express@4.17.20 con la version a ver si asi evitas esos errores.
    // const product = new Product(req.body) // creamos una instancia del Model (instancia de la base de datos)
    // const savedProduct = await product.save() // lo guarda en la base de datos. al usar await, lo que hacemos es esperar a que lo envie por tanto lo que devolvemos luego en el echo no es el product sin más, sino el product ya integrado en la base de datos, por tanto podemos usar el id o lo que queramos en la respuesta res
    try {
        const product = await Product.create(req.body) //con esto basicamente hacemos lo mismo que las dos lineas de arriba, pero en una sola
        res.status(201).json({ data: product }) // hacemos un echo 
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => { // una función que modifique una base de DATOS SIEMPRE HA DE SER ASINCRONA. debe devolver una promise<void> por el sida de versionado, prueba con npm install --save-dev @types/express@4.17.20 con la version a ver si asi evitas esos errores.
    const { id } = req.params
    const product = await Product.findByPk(id) //pk -> primary key

    //primero comprobar que el producto existe
    if (!product) {
        res.status(400).json({
            error: 'Producto no encontrado'
        })
        return
    }
    //actualizar
    await product.update(req.body) // funcion update, solo actualiza lo que le pases.
    await product.save() //guardarlo en la base de datos

    res.json({data:product})
}

export const updateAvailability = async (req: Request, res: Response): Promise<void> => { // una función que modifique una base de DATOS SIEMPRE HA DE SER ASINCRONA. debe devolver una promise<void> por el sida de versionado, prueba con npm install --save-dev @types/express@4.17.20 con la version a ver si asi evitas esos errores.
    const { id } = req.params
    const product = await Product.findByPk(id) //pk -> primary key

    //primero comprobar que el producto existe
    if (!product) {
        res.status(400).json({
            error: 'Producto no encontrado'
        })
        return
    }
    //actualizar
    //product.availability = req.body.availability //con patch solo cambiamos lo que nos pidan, no reemplaza todo. con put (a no ser que uses la funcion update, machacas todo)
    product.availability = !product.dataValues.availability //lo negamos para que puedas hacer una solicitud simplemente pulsando un boton y simplemente se cambie, asi no hace falta mandar nada en el JSON
    await product.save() //guardarlo en la base de datos

    res.json({data:product})
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => { // una función que modifique una base de DATOS SIEMPRE HA DE SER ASINCRONA. debe devolver una promise<void> por el sida de versionado, prueba con npm install --save-dev @types/express@4.17.20 con la version a ver si asi evitas esos errores.
    const { id } = req.params
    const product = await Product.findByPk(id) //pk -> primary key

    //primero comprobar que el producto existe
    if (!product) {
        res.status(400).json({
            error: 'Producto no encontrado'
        })
        return
    }
    
    await product.destroy()

    res.json({data:'producto eliminado'})
}
