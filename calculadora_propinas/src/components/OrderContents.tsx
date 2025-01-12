import { MenuItem, OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderContentsProps = {
    order: OrderItem[],
    removeItem: (item_id: MenuItem['id']) => void
}

export default function OrderContents({ order, removeItem }: OrderContentsProps) {
    return (
        <div>
            <h2 className='font-black text-4xl'>Consumo</h2>

            <div className="space-y-3 mt-10">
                {
                    order.map(item => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-t border-gray-200 py-5 last-of-type:border-b"
                        >
                            <div>
                                <p className="text-lg">
                                    {item.name} - {formatCurrency(item.price * item.quantity)}
                                </p>
                                <p className="font-black">
                                    Cantidad: {item.quantity} - ${item.price}
                                </p>
                            </div>

                            <button className="bg-red-600 h-8 w-8 rounded-full text-white font-black" onClick={() => removeItem(item.id)}>
                                X
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
