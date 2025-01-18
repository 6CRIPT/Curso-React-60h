import axios from "axios"
import { CryptoCurrenciesResponseSchema } from "../schema/crypto-schema"
import { Pair } from "../types"

export async function getCryptos(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    const {data: {Data}} = await axios.get(url) //esto es por como es la solicitud
    const result = CryptoCurrenciesResponseSchema.safeParse(Data) //basicamente con este schema lo que hacemos es validar que lo que nos devuelve la api tenga el formato que queremos (nuestro schema) como solo le hemos puesto que nos interesa el FullName y el Name, comprueba eso.
    if(result.success){
        return result.data //devolvemos los datos (solo llevan lo que hemos definido en el schema)
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair){

}
