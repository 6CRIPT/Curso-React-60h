import { Router } from "express"
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product"
import { body, param } from "express-validator" // para validar en router con funciones no asincronas
import { handleInputErrors } from "./middleware"

const router = Router()

router.get('/getProducts', getProducts)

router.get('/products/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors, // le pasamos el middleware
    getProductById) //con los dos puntos, lo que va después es una variable, esto es routing dinámico: así el cliente nos pasa como parametro la id que necesite.


router.post('/createProduct',
    //validacion del producto
    body('name').notEmpty().isAlphanumeric().withMessage('El nombre del producto no puede estar vacío, y solo deben ser letras o numeros'),
    body('price')
        .notEmpty().withMessage('El precio no puede estar vacío')
        .isNumeric().withMessage('El precio debe ser un número')
        .custom(value => value > 0).withMessage('El precio debe ser un número positivo'),
        handleInputErrors,
        createProduct
)

router.put('/updateProduct/:id',
    param('id').isInt().withMessage('ID no válido'), 
    body('name').notEmpty().isAlphanumeric().withMessage('El nombre del producto no puede estar vacío, y solo deben ser letras o numeros'),
    body('price')
        .notEmpty().withMessage('El precio no puede estar vacío')
        .isNumeric().withMessage('El precio debe ser un número')
        .custom(value => value > 0).withMessage('El precio debe ser un número positivo'),
        body('availability').isBoolean().withMessage('Valor para disponibilidad no válido'),
        handleInputErrors,
    updateProduct)

router.patch('/updateAvailability/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability)

router.delete('/deleteProduct/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

export default router