import { Activity } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |//para ver cual esta activa para editar
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' } 




export type ActivityState = { // ESTADO BASICO COMO USESTATE PERO MAS COMPLEJO
    activities: Activity[],
    activeId: Activity['id']  //valdria string pero mejor asi, mas general por si cambia
}

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : [] // si hay actividades en el localStorage, se devuelven, si no, se devuelve la lista vacia
}

export const initialState: ActivityState = { // ESTO ES UN ESTADO COMO EL DE USESTATE PERO COMPLEJO
    
    activities: localStorageActivities(), //cargamos el Storage o bien vacio si no hay
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if (action.type == 'save-activity') {
        // esto es la lógica para actualizar el state cuando hagas un save-activity
        let updatedActivities : Activity[] = []
        if(state.activeId){ //si tenemos algo aquí, es que estamos editando una actividad
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        }else{
            updatedActivities = [...state.activities, action.payload.newActivity] //mantenemos lo que ya teniamos antes
        }

        return { // estado actualizado
            ...state, // lo de antes más...
            activities: updatedActivities,
            activeId: '' // reiniciamos el activeId despues de cada save para no reescribir constantemente.
        }
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id //basicamente lo que hacemos es devolver el estado igual, no cambiamos el resto de actividades, pero para la que estamos seleccionando, cambiamos el activeId a su id
        }
    }

    if (action.type === 'delete-activity') {
        return {
            ...state, //mantenemos el resto del estado igual
            activities: state.activities.filter( activity => activity.id !== action.payload.id) // y mantenemos todas las actividades que no sean la del id marcado. 
        }
    }

    if(action.type === 'restart-app'){
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}