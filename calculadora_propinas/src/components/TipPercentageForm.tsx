
const tipOptions = [
    {
        id: 'tip-10',
        value: .10,
        label: '10%'
    },
    {
        id: 'tip-20',
        value: .20,
        label: '20%'
    },
    {
        id: 'tip-50',
        value: .50,
        label: '50%'
    },
]

type TipPercentageFormProps = {
    setTip: React.Dispatch<React.SetStateAction<number>>
    tip: number
}

export default function TipPercentageForm({setTip, tip}: TipPercentageFormProps) {
    return (
        <div>
            <h3 className="font-black text-2xl">Propina:</h3>

            <form>
                {tipOptions.map(tipOption => (
                    <div key={tipOption.id} className="flex gap-2">
                        <label htmlFor={tipOption.id}>{tipOption.label}</label> {/*se conecta el label con el input gracias al htmlfor + id*/}
                        <input
                            id={tipOption.id}
                            type="radio"
                            name="tip" // esto para que solo pueda marcarse uno a la vez
                            value={tipOption.value}
                            onChange={e => setTip(+e.target.value)} //e es el evento target el input que tiene el foco y el value es el value del input el + es para convertirlo a number
                            checked={tipOption.value === tip} // esto es para reiniciarlo al guardar ordenes basicamente
                        />
                    </div>

                ))}
            </form>
        </div>
    )
}
