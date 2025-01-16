import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions =
    { type: "add-budget", payload: { budget: number } } |
    { type: "show-modal" } |
    { type: "close-modal" } |
    { type: "add-expense", payload: { expense: DraftExpense } }


export type BudgetState = {
    budget: number,
    modal: boolean, //controlara que se vea o no el modal
    expenses: Expense[]

}

export const initialState: BudgetState = {
    budget: 0,
    modal: false, //inicialmente a falso para no mostrarlo
    expenses: []
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4() //le metemos un id al draft (que no tienen id)
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true // para que el modal se vea
        }
    }

    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false // para que el modal se vea
        }
    }

    if (action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, action.payload.expense],
            modal: false // al añadir un gasto, cerramos el modal
        }
    }

    return state
}