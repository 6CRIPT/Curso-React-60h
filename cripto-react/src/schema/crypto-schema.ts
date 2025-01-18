import { z } from 'zod'

export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string()
})

export const CryptoCurrencyResponseSchema = z.object({
    //CLAVE!! PUEDES FILTRAR CON ZOD LAS COSAS QUE NECESITAS DE LA PETICION PARA EVITAR MAZO DE MIERDA QUE NO TE INTERESE, por ejemplo de aqui hacemos que solo obtenemos de la api las 2 cosas que nos interesan. en gt puedes quitar toda la mierda y quedarte con los codigo postales, localidad y precios por ejemplo.
    CoinInfo: z.object({
        FullName: z.string(), //solo quiero el nombre de la crypto
        Name: z.string() //y su token abreviado
    })
})

//tiene que ser una lista pq va a recibir varios
export const CryptoCurrenciesResponseSchema = z.array(CryptoCurrencyResponseSchema)

//par moneda-crypto para el state del form
export const PairSchema = z.object({
    currency: z.string(),
    cryptocurrency: z.string()
})

export const CryptoPriceSchema = z.object({ // de toda la informacion solo nos quedaremos con:
    IMAGEURL: z.string(),
    PRICE: z.string(),
    HIGHDAY: z.string(),
    LOWDAY: z.string(),
    CHANGEPCT24HOUR: z.string(),
    LASTUPDATE: z.string()
})