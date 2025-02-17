// tipos de datos

/* COMENTARIO MULTIPLE */

// Undefined
let cliente
console.log(cliente) // sale undefined
console.log(typeof cliente) // sale undefined tambien

//Strings o cadenas
let nombre = "César"
console.log(typeof nombre) 

//Numeros -> Solo exite tipo number
const numero = 20.20
const numero2 = 100
console.log(typeof numero)
console.log(typeof numero2)

const numero3 = "100"
console.log(numero2 + numero3) //concatena

//null
const descuento = null //esta inicializada a nada, pero es diferente a undefined.

let x = "texto" // x representa una cadena (string)
x = {color:'rojo', marca:'seat', año:2018} // x ahora es un objeto
x = [1, 2, 3, "prueba", 6] // ahora un vector (array)
x = function() {return "Ejemplo"} // ahora una función
let y = x() 
console.log(typeof y)

