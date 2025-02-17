import { Link } from "react-router-dom"
import FormComponent from "../components/FormComponent"


export default function NewProduct() {
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Registrar producto
                </h2>
                <Link
                    to="/" //esto apunta a la pagina principal
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-md hover:bg-indigo-500"
                >
                    Inicio
                </Link>
            </div>
            <FormComponent/>
        </>
    )
}
