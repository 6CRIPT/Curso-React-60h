
import { ChangeEvent, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css"
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')

    const {dispatch} = useBudget()

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target //como este handler nos va a servir para los inputs en general, entonces tenemos que extraer primero su atributo de name y de value, para saber que input está cambiando y su valor
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value //Si es el campo de amount, transformamos el value en un numero con el +, y si no, lo cambiamos tal cual (será un string)
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //validar que todos los campos estan correctos
        if(Object.values(expense).includes('')){ // si algun campo contiene la cadena vacia, significa que esta vacio
            setError('Error: Debes rellenar todos los campos.')
            return // retornamos vacio
        }
        //en caso de que todo esté bien
        dispatch({
            type: 'add-expense',
            payload: {expense} // le pasamos el state de expense
        })

        //reiniciar el State
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                Nuevo gasto
            </legend>

            {error && <ErrorMessage> {error} </ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Nombre gasto:
                </label>

                <input
                    type="text"
                    name="expenseName"
                    id="expenseName"
                    className="bg-slate-100 p-2"
                    placeholder="Añade el nombre del gasto"
                    onChange={handleChange}
                    value={expense.expenseName}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad:
                </label>

                <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="bg-slate-100 p-2"
                    placeholder="Añade la cantidad del gasto: ej. $300"
                    onChange={handleChange}
                    value={expense.amount}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Categoria:
                </label>

                <select
                    name="category"
                    id="category"
                    className="bg-slate-200"
                    onChange={handleChange}
                    value={expense.category}
                >
                    <option value=""> -- Seleccione categoría -- </option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Fecha gasto:
                </label>

                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value='Registrar gasto'
            />
        </form>
    )
}
