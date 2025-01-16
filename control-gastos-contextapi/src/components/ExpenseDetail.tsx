import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense, Value } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    expense: Expense
}

const formatDateComplete = (expenseDate: Value) => {
    let date = formatDate(expenseDate!.toString())
    date = date[0].toUpperCase().toString() + date.slice(1, date.length)
    return date
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

    const {dispatch} = useBudget()

    const categoryInfo = useMemo(() => (
        categories.filter(cat => cat.id === expense.category)[0]
    ), [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction 
            onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}
            >  {/*Esto es la acción a disparar, como un botón*/}
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
            onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})}
            destructive={true} //para eliminar del front, NO DEL STATE
            
            >  {/*Esto es la acción a disparar, como un botón*/}
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
            maxSwipe={1} //los pixeles que han de deslizarse para que salga
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono-gasto"
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-3">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDateComplete(expense.date)}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
