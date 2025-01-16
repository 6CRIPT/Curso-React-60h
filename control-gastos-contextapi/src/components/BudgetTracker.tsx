import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget, dispatch } = useBudget() //obtenemos el estado

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    const handleReset = () => {
        dispatch({type: 'reset-app'})
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#DC2626' :'#3B82F6', //COLOR DE LO RELLENADO
                        trailColor: '#F5F5F5',
                        textSize: 8,
                        textColor: percentage === 100 ? '#DC2626' :'#3B82F6'
                    })}
                    text={`${percentage}% Gastado`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                    onClick={handleReset}
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label='Prespuesto total'
                    amount={state.budget}
                />

                <AmountDisplay
                    label='Prespuesto restante'
                    amount={remainingBudget}
                />

                <AmountDisplay
                    label='Total gastado'
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}
