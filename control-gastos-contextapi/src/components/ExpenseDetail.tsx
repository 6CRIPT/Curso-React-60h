import { formatDate } from "../helpers"
import { Expense, Value } from "../types"
import AmountDisplay from "./AmountDisplay"

type ExpenseDetailProps = {
    expense: Expense
}

const formatDateComplete = (expenseDate: Value) => {
    let date = formatDate(expenseDate!.toString())
    date = date[0].toUpperCase().toString() + date.slice(1, date.length)
    return date
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
    return (
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
            <div>

            </div>

            <div>
                <p>{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">{formatDateComplete(expense.date)}</p>
            </div>

            <AmountDisplay
                amount={expense.amount}
            />
        </div>
    )
}
