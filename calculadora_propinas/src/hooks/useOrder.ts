import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"


export default function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([])
    const[tip, setTip] = useState(0)

    const addItem = (item: MenuItem) => {
        const itemExist = order.find(orderItem => orderItem.id === item.id)
        if (itemExist){
            const updatedOrder = order.map(orderItem => orderItem.id === item.id ? {...orderItem, quantity: orderItem.quantity + 1} : orderItem) // basicamente lo que hace es si el elemento existe, recorre todos los items y para el que se ha hecho click, crea una copia exactamente igual, y le incremente la cantidad. si el elemento no es el seleccionado (no coincide la id) entonces se deja tal cual, de ahí el ternario
            setOrder(updatedOrder) //actualizamos el state
        }else{
            const newItem: OrderItem = {...item, quantity: 1}
            setOrder([...order, newItem])
        }

    }

    const removeItem = (item_id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== item_id))
        //no se necesita nada mas realmente, ya que al hacer filter, creamos un nuevo state copia pero sin el id que le estamos pasando y eso ya es suficiente para borrarlo.
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}