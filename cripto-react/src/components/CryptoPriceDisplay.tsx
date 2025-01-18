import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner"


export default function CryptoPriceDisplay() {

    const { result, loading } = useCryptoStore()
    const hasResult = useMemo(() => !Object.values(result).includes(''), [result]) // si no hay valores vacíos, entonces es que hay un resultado

    return (
        <div className="result-wrapper">
            {loading ? <Spinner/> : hasResult && ( //si estamos loading, entonces mostramos el spinner, si no, entonces vemos si tenemos resultado y lo mostramos. no mostraremos nada cuando no estemos en loading ni tengamos resultado, esto es cuando aun realmente no hemos hecho la consulta a la api.
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="imagen extraida de la API" />
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>El precio máximos es de: <span>{result.HIGHDAY}</span></p>
                            <p>El precio mínimo es de: <span>{result.LOWDAY}</span></p>
                            <p>El cambio en las últimas 24 horas es de: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Última actualización: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}
