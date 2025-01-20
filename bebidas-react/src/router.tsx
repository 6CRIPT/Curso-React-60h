import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./views/IndexPage"
import FavoritesPage from "./views/FavoritesPage"
import Layout from "./layouts/Layout"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}> {/*esto va a mostrarse en ambas, como un recubrimiento*/}
          <Route path="/" element={<IndexPage/>} />  {/*path es el link a donde va a llevar, element es el componente a cargar*/}
          <Route path="/favoritos" element={<FavoritesPage/>} />  {/*path es el link a donde va a llevar, element es el componente a cargar*/}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
