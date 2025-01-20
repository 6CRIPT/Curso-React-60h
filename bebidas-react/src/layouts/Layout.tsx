import { Outlet } from "react-router-dom" //nos sirve para que el layout no se coma el resto de la pagina, simplemente se añada.
import Header from "../components/Header"
import Modal from "../components/Modal"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Notification from "../components/Notification"


export default function Layout() {
    const {loadFromStorage} = useAppStore()

    useEffect(() => loadFromStorage() ,[])

    return (
        <>
            <Header></Header>

            <main className="container mx-auto py-16">
                <Outlet /> {/* Dependiendo de donde lo pongas, se pone encima debajo etc. outlet es la otra pagina basicamente */}
            </main>

            <Modal/>
            <Notification/>
        </>
    )
}
