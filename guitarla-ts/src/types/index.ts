export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

// export type CartItem = Pick<Guitar, "id" | "name" | "price"> & { // con pick te quedas solo lo que quieras, con omit, los omites, y con = Guitar & heredas todo.
//     quantity: number
// }

// export type GuitarID = Pick<Guitar, "id">

export type GuitarID = Guitar["id"]

export type CartItem = Guitar & {
    quantity: number
}


export type GuitarProps = { // para definiar los tipos de los argumentos de la funcion del componente
    guitar: Guitar, addToCart : (item: Guitar) => void
}