import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"


export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const { pathname } = useLocation() //con location.pathname sacas la pagina en la que estas

    const isHome = useMemo(() => pathname === '/', [pathname]) // para saber si estamos en la pagina de inicio

    const {fetchCategories,categories, searchRecipes, showNotification} = useAppStore()

    useEffect(() => { // cuando carga la app, llamamos a la funcion que llama a la API para obtener las categorias.
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(searchFilters).includes('')){
            //todos los campos son obligatorios
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        //consultar las respuestas
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : "bg-slate-800"}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logo" />
                    </div>

                    <nav className="flex gap-4">
                        {/* <Link to="/" className="text-white uppercase font-bold">Inicio</Link> {/* es como la etiqueta a, pero mejor */}
                        {/* <Link to="/favoritos" className="text-white uppercase font-bold">Favoritos </Link> es como la etiqueta a, pero mejor */}
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}
                        >Inicio
                        </NavLink> {/* es como link, pero con un callback que permite ejecutar una funcion usando isActive. */}

                        <NavLink
                            to="/favoritos"
                            className={({ isActive }) => isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}
                        >Favoritos
                        </NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">
                                Nombre o ingredientes
                            </label>
                            <input
                                id="ingredient"
                                type="text"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:out"
                                placeholder="Nombre o ingredientes. Ej. Vodka, tekila, etc."
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">
                                Categoría
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:out"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value=""> -- Seleccione una opción -- </option>
                                {categories.drinks.map(category => (
                                    <option
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value='Buscar recetas'
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}

            </div>
        </header>
    )
}
