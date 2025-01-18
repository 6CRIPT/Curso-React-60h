import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { Cryptocurrency, Pair } from "./types"
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService"

type CryptoStore = { // Esto es el tipo del state, se crea con create
    cryptocurrencies: Cryptocurrency[]
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [], //esto va a ser nuestro state

    fetchCryptos: async () => { //debe ser asincrona pq es una consulta a una api
        const cryptocurrencies_obtained = await getCryptos()
        set(() => ({
            cryptocurrencies: cryptocurrencies_obtained
        }))
    },

    fetchData: async(pair) => {
        await fetchCurrentCryptoPrice(pair)
    }
})))