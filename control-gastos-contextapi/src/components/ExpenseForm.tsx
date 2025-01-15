import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css"
import "react-date-picker/dist/DatePicker.css"

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ExpenseForm() {
    return (
        <form className="space-y-5">
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                Nuevo gasto
            </legend>

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Nombre gasto:
                </label>

                <input
                    type="text"
                    name="expenseName"
                    id="expenseName"
                    className="bg-slate-100 p-2"
                    placeholder="Añade el nombre del gasto"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad:
                </label>

                <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="bg-slate-100 p-2"
                    placeholder="Añade la cantidad del gasto: ej. $300"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Categoria:
                </label>

                <select
                    name="category"
                    id="category"
                    className="bg-slate-200"
                >
                    <option value=""> -- Seleccione categoría -- </option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Fecha gasto:
                </label>

                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                />
            </div>

            <input type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value='Registrar gasto'
            />
        </form>
    )
}
