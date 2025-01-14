import { v4 as uuidv4 } from "uuid"

import { categories } from "../data/categories"
import { useState, ChangeEvent, Dispatch, useEffect } from "react"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activityReducer"
import { ActivityState } from "../reducers/activityReducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(), //id que es un string
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)
    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => { //e es el input donde estamos escribiendo
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value //sin nada k aser ijuesixingadamare
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0 // que sean numeros y actividad válida
    }

    const setButtonValue = () => {
        if (activity.category == 1) {
            return "Guardar comida"
        } else if (activity.category == 2) {
            return "Guardar ejercicio"
        } else {
            return "What the fuck you are a hacker!"
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: uuidv4() // id nuevo, para reiniciar el forms pero con el id cambiado XD
        })
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category} /*por asi decirlo, lo conecta con el state el input */
                    onChange={handleChange}
                >
                    {/* <option value="Selecciona una opción">Selecciona una opción</option> */}
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. manzana, bicicleta, etc."
                    value={activity.name} /*por asi decirlo, lo conecta con el state el input */
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias, ej. 300 o 400"
                    value={activity.calories} /*por asi decirlo, lo conecta con el state el input */
                    onChange={handleChange}
                />
            </div>

            <input type="submit" name="" id=""
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={setButtonValue()}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
