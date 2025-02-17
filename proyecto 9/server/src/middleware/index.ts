import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) { // si hay errores...
        res.status(400).json({ errors: errors.array() }) //si la request es incorrecta, entonces devolvemos un error 400 y los errores en forma de array y json
        return //este return puede ir con la linea anterior -> return res.status... si haces lo de instalar el tipado correcto entre express y types/express
    }

    next() // ya terminé aquí, vete a la siguiente función
}