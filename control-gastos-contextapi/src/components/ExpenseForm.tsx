
import { ChangeEvent, useEffect, useState } from "react";
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
    const [previousAmount, setPreviousAmount] = useState(0)
    const { dispatch, state, remainingBudget } = useBudget()

    useEffect(() => {
        if (state.editingId) { //hay que hacer este if pq el useEffect siempre se ejecuta al cargar la pagina por tanto, debemos comprobar que se ha ejecutado porque hay un editingId y no porque la pagina se ha cargado
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense) //metemos en el form el gasto que tenemos en editingId
            setPreviousAmount(editingExpense.amount) //para guardar el amount de la que estamos editando y no perderla 
        }
    }, [state.editingId])

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target //como este handler nos va a servir para los inputs en general, entonces tenemos que extraer primero su atributo de name y de value, para saber que input está cambiando y su valor
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value //Si es el campo de amount, transformamos el value en un numero con el +, y si no, lo cambiamos tal cual (será un string)
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //validar que todos los campos estan correctos
        if (Object.values(expense).includes('')) { // si algun campo contiene la cadena vacia, significa que esta vacio
            setError('Error: Debes rellenar todos los campos.')
            return // retornamos vacio
        }

        //validar que no me pase del limite
        if ((expense.amount - previousAmount) > remainingBudget) { // teniamos una accion a $200, la queremos editar a $400. Y teniamos disponibles $100 restantes. Por tanto, $400 - $200 (la diferencia de precio) > $100 disponibles, NOS PASAMOS.
            setError('No queda suficiente dinero en el presupuesto')
            return // retornamos vacio
        }

        //en caso de que todo esté bien AÑADIR O ACTUALIZAR EXPENSE
        if (state.editingId) {
            dispatch({
                type: 'update-expense',
                payload: { expense: { id: state.editingId, ...expense } } // le pasamos el state de expense + la id para editarla
            })
        } else {
            dispatch({
                type: 'add-expense',
                payload: { expense } // le pasamos el state de expense
            })
        }

        //reiniciar el State
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0) //resetear el previous amount para las futuras ediciones
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? 'Guardar gasto' : 'Nuevo gasto' /* si estamos editando, entonces uno, si no, el otro*/}
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
                value={state.editingId ? 'Guardar gasto' : 'Registrar gasto' /* si estamos editando, entonces uno, si no, el otro*/}
            />
        </form>
    )
}
