import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { Cryptocurrency, CryptoPrice, Pair } from "./types"
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService"

type CryptoStore = { // Esto es el tipo del state, se crea con create
    //estado
    cryptocurrencies: Cryptocurrency[]
    result: CryptoPrice
    loading: boolean

    //acciones
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [], //esto va a ser nuestro state
    result: {
        IMAGEURL : '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },

    loading : false,

    fetchCryptos: async () => { //debe ser asincrona pq es una consulta a una api
        const cryptocurrencies_obtained = await getCryptos()
        set(() => ({
            cryptocurrencies: cryptocurrencies_obtained
        }))
    },

    fetchData: async(pair) => {
        set(() => ({
            loading: true
        }))

        const result = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            result, // como la variable que nos devuelve la API y la del state se llaman igual no hace falta poner :
            loading: false // lo dejamos de nuevo en false para no tener la animacion todo el rato, simplemente hasta que se obtienen los datos en el await.
        }))
    }
})))