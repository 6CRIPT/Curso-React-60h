import { formatCurrency } from "../helpers"
import { OrderItem } from "../types"
import { useCallback } from 'react'
//import { useMemo } from 'react'

type OrderTotalsProps = {
    order: OrderItem[]
    tip: number,
    placeOrder: () => void
}

export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {

    // const subTotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    // const tipAMount = useMemo(() => subTotalAmount * tip, [tip, order]) //para que se calcule o bien cuando cambiamos la propina que queremos dejar o cuando cambiemos el contenido de la orden

    // const totalAmount = useMemo(() => subTotalAmount + tipAMount, [tip, order])

    const subTotalAmount = useCallback(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    const tipAMount = useCallback(() => subTotalAmount() * tip, [tip, order]) //para que se calcule o bien cuando cambiamos la propina que queremos dejar o cuando cambiemos el contenido de la orden

    const totalAmount = useCallback(() => subTotalAmount() + tipAMount(), [tip, order])


    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Total y propina:</h2>
                <p>Subtotal a pagar:
                    <span className="font-bold"> {formatCurrency(subTotalAmount())}</span>
                </p>
                <p>Propina:
                    <span className="font-bold"> {formatCurrency(tipAMount())}</span>
                </p>
                <p>Total a pagar:
                    <span className="font-bold"> {formatCurrency(totalAmount())}</span>
                </p>
            </div>

            <button className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
            disabled = {totalAmount() == 0}
            onClick={() => placeOrder()}
            >
                Guardar pedido
            </button>
        </>
    )
}
