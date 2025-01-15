import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import { useBudget } from "./hooks/useBudget"
import { useMemo } from "react"
import ExpenseModal from "./components/ExpenseModal"


function App() {

  //const context = useContext(BudgetContext) //creamos el contexto del tipo que acabamos de hacer

  const { state } = useBudget()

  const isValidBudget = useMemo(() => ( // se usan parentesis porque directamente queremos devolver la comparacion, con {} es el cuerpo de la funcion y habria que hacer un return
    state.budget > 0
  ), [state.budget])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && ( // esto es como un ternario pero solo tienes la primera parte, el if
        <main className="max-w-3xl mx-auto py-10">
          

          <ExpenseModal />
        </main>
      )}

    </>
  )
}

export default App
