export type BudgetActions =
    { type: "add-budget", payload: { budget: number } } |
    { type: "show-modal" } |
    { type: "close-modal" } 

export type BudgetState = {
    budget: number,
    modal: boolean //controlara que se vea o no el modal
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false //inicialmente a falso para no mostrarlo
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

    return state
}