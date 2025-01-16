import { v4 as uuidv4 } from 'uuid'
import { Category, DraftExpense, Expense } from "../types"

export type BudgetActions =
    { type: "add-budget", payload: { budget: number } } |
    { type: "show-modal" } |
    { type: "close-modal" } |
    { type: "add-expense", payload: { expense: DraftExpense } } |
    { type: "remove-expense", payload: { id: Expense['id'] } } |
    { type: "get-expense-by-id", payload: { id: Expense['id'] } } |
    { type: "update-expense", payload: { expense: Expense } } |
    { type: "reset-app" } |
    { type: "add-filter-category", payload: { id: Category['id']} } 

export type BudgetState = {
    budget: number,
    modal: boolean, //controlara que se vea o no el modal
    expenses: Expense[],
    editingId: Expense['id'] //el tipo obviamente debe ser del tipo del que sea el id de un expense.
    currentCategory: Category['id']
}

const initialBudget = () => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
    budget: initialBudget(), //para no reiniciar siempre la app
    modal: false, //inicialmente a falso para no mostrarlo
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
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
            modal: false, // para que el modal se vea
            editingId: '' // PARA QUE SI LO CIERRAN SIN EDITAR, SIEMPRE SE REINICIE EL editingId
        }
    }

    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false // al añadir un gasto, cerramos el modal
        }
    }

    if (action.type === 'remove-expense') {

        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id),
        }
    }

    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id, // actualizamos el estado con la id que queremos editar
            modal: true // para lanzar el modal, para cargar los datos del expense que queremos editar
        }
    }

    if (action.type === 'update-expense') {

        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense), //basicamente si es el que estamos editando, entonces se guarda el expense en si mismo en vez de crear uno nuevo
            modal: false,
            editingId: ''
        }
    }

    if (action.type === 'reset-app') {

        return {
            budget: 0, //para no reiniciar siempre la app
            modal: false, //inicialmente a falso para no mostrarlo
            expenses: [],
            editingId: '',
            currentCategory: ''
        }
    }

    if (action.type === 'add-filter-category') {

        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}