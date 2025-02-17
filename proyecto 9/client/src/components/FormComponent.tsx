import {  ActionFunctionArgs, Form, useActionData } from "react-router-dom"
import ErrorMsg from "./ErrorMsg"
import { addProduct } from "../services/ProductService"


export async function action({ request }: ActionFunctionArgs) { //un action siempre debe devolver un objeto, aunque este vacio
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if (Object.values(data).includes('')) {
        error = 'todos los campos son obligatorios'
    }
    if (error.length) {
        return error
    }
    addProduct(data)
    return {} //importante  
}

export default function FormComponent() {

    const error = useActionData() as string//este hook sirve para poder usar los datos de las actions

    return (
        <>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <Form
                className="mt-10"
                method="POST"
            >

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="name"
                    >Nombre Producto:</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Producto"
                        name="name"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="price"
                    >Precio:</label>
                    <input
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                    />
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
