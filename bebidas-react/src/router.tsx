import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"


const IndexPage = lazy(() => import("./views/IndexPage"))
const FavoritesPage = lazy(() => import("./views/FavoritesPage"))

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> {/*esto va a mostrarse en ambas, como un recubrimiento*/}
          <Route path="/" element={
            <Suspense fallback="Cargando...">
              <IndexPage/>
            </Suspense>
          }/>  {/*path es el link a donde va a llevar, element es el componente a cargar*/}
          
          <Route path="/favoritos" element={
            <Suspense fallback='Cargando...'> {/* AQUI PUEDES PONER UN SPINNER CLAVE!! EN FALLBACK */}
              <FavoritesPage />
            </Suspense>
          } />  {/*path es el link a donde va a llevar, element es el componente a cargar*/}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
