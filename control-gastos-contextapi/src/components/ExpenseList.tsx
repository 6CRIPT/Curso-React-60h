import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"
import { categories } from "../data/categories"


export default function ExpenseList() {
    const { state } = useBudget()


    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses // esto basicamente consulta si hay alguna categoria por la que filtrar y si es asi, solo devuelve aquellos expenses que son de esa categoria, para ser mostrados en el componente. Si no existe esa categoría, simplemente se devuelve toda la lista.

    const isEmpty = useMemo(() => {
        return filteredExpenses.length === 0 //comprobamos los filtrados, para el texto de la lista.
    }, [filteredExpenses])

    const currentCategory = categories.find(category => category.id === state.currentCategory);

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ?
                <p className="text-gray-600 text-2xl font-bold">
                    {state.currentCategory === ''
                        ? "No hay gastos aún."
                        : `No hay gastos aún en ${currentCategory ? currentCategory.name : "esta categoría"}.`}
                </p>
                : (
                    <>
                        <p className="text-gray-600 text-2xl font-bold my-5">Lista de gastos</p>
                        {filteredExpenses.map(expense => (
                            <ExpenseDetail
                                key={expense.id}
                                expense={expense}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}
