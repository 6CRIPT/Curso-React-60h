//provider es de donde vienen los datos, el state --> del reducer

import { useReducer, createContext, ReactNode, useMemo } from "react"
import { budgetReducer, initialState, BudgetState, BudgetActions } from "../reducers/budget-reducer"
import { Expense } from "../types"

type BudgetContextProps = {
    state: BudgetState,
    dispatch: React.Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() => {
        return state.expenses.reduce((total: number, expense: Expense) => expense.amount + total, 0)
    }, [state.expenses])

    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}