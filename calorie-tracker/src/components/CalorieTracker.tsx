import type { Activity } from "../types"
import { useMemo } from "react"
import CalorieDisplay from "./CalorieDisplay"


type CalorieTrackerProps = { //type!!!!!!!!!!
    activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
    //contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? activity.calories : total, 0), [activities]) // si es tipo 1, se suman las calorias, si no, se deja total como está. empieza en 0 obvio y usamos useMemo para que reaccione siempre cuando el state (activities) cambie

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? activity.calories : total, 0), [activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center"> Resumen de calorías</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="consumidas"
                />

                <CalorieDisplay
                    calories={caloriesBurned}
                    text="quemadas"
                />

                <CalorieDisplay
                    calories={netCalories}
                    text="de diferencia"
                />
            </div>
        </>
    )
}
