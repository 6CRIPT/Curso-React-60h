import axios from "axios"
import { SearchType } from "../types"
import { z } from 'zod'
import { useMemo, useState } from "react"
// import { object, string, number, InferOutput, parse } from 'valibot'

//Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),

    })
})

export type Weather = z.infer<typeof Weather>


//valibot
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_min: number(),
//         temp_max: number()
//     })
// })
// type Weather = InferOutput<typeof WeatherSchema>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        setNotFound(false)
        
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const { data } = await axios.get(geoUrl) //obtener los datos con axios

            //comprobar si existe la ciudad
            if(!data[0]){
                setNotFound(true)
                return
            }
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            //Zod            
            const { data: weatherResult } = await axios.get(weatherUrl)
            const result = Weather.safeParse(weatherResult) //comprueba que las propiedades del JSON coinciden con las del objeto de Zod. Devuelve true/false

            if (result.success) {
                setWeather(result.data)
                console.log('respuesta bien formada')
            } else {

                console.log('respuesta mal formada')
            }

            //valibot
            // const { data: weatherResult } = await axios.get(weatherUrl)
            // const result = parse(WeatherSchema, weatherResult)
            // if (result) {

            // } else {

            // }

        } catch (error) {
            console.log(error)
        } finally { // para el spinner
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}