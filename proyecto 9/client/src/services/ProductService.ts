import { safeParse } from "valibot";
import { DraftProductSchema } from "../types"
import axios from "axios";

type productData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: productData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        }) //validamos que la data sirva!
        if (result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/productos`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
} 