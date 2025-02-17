import { Table, Column, Model, DataType, Default } from "sequelize-typescript";


@Table({
    tableName: 'products'
})


class Product extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.FLOAT //primero, las cifras naturales del numero y despues las decimales
    })
    declare price: number

    @Default(false) //esto hace que no haga falta poner en la request esta columna, en este caso availability
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product