import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useState, useEffect } from "react";
import { db } from "./data/db";

function App() {
  //States SIEMPRE ANTES DEL RETURN. nunca despues ni en condicionales, ni loops, funciones, etc.
  //Siempre despues de usar una funcion de set para cambiar un estado, react renderiza la pagina de nuevo
  // const [auth, setAuth] = useState(false); //por ejemplo para manejar si un usuario ha iniciado sesion o no.
  // const [total, setTotal] = useState(0);
  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   console.log("Componente listo o escuchando en cart y auth");
  // }, [cart, auth]); //lo que va entre corchetes son las dependencias del useEffect, cada vez que haya un cambio en algun state de sus dependencias, se ejecutaria el callback. Si lo dejas vacio, simplemente al terminar de cargar la pagina. Por ello lo suyo es que el useEffect dependa de APIs por ejemplo, cuando la API ha cargado el valor el estado cambia y se ejecuta el callback

  // setTimeout(() => {
  //   setAuth(true)
  // },3000);

  // console.log(db)
  const [data, setData] = useState(db) //como es un archivo local, podemos hacer un useState
  //data es un array

  // useEffect(() => { //pero de normal con APIs y tal, mejor useEffect.
  //   setData(db)
  // }, [])

  const initialCart = () => { //persistencia del carrito, si ya existe un cart en memoria, lo carga, no lo inicializa a vacio como antes, que teniamos el state siempre []
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [cart, setCart] = useState(initialCart) // estado del carrito
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]) //cuando el state de cart cambia, se actualiza el localstorage

  function addToCart(item){
    console.log("xd")
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
    if (itemExists >= 0){
      //para actualizar la cantidad que hay en el carrito
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
      console.log("Ya existe")
    } else {
      console.log("Agregando")
      item.quantity = 1
      setCart((prevCart) => [...prevCart, item]) //importante que no mute el estado del original.
    }
  }

  function removeFromCart(id){
    setCart((prevCart)=> prevCart.filter(guitar => guitar.id !==id)) // para mantener todas las guitarras menos la que hemos hecho click en borrar
  }

  function increaseQuantity(id){
    const updatedCart = cart.map( item => { //se aplica a todos los elementos del carrito una funcion la cual comprueba el id, y si coincide, incrementa la cantidad manteniendo todas las caracteristicas del item excepto la cantidad que se ve incrementada.
      if(item.id === id && item.quantity < MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity +  1
        }
      }
      return item // default, para todos los que no son el objetivo
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return {
          ...item,
          quantity: item.quantity -  1
        }
      }
      return item // default, para todos los que no son el objetivo
    })
    setCart(updatedCart)
  }

  function clearCart(){
    setCart([]) // facilito
  }

  return (
    <>
      <Header
        cart = {cart}
        removeFromCart = {removeFromCart}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        clearCart = {clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return(
              <Guitar
                key={guitar.id} //para arreglar el erroro del key unico de react, puedes usar el id unico de cada elemento de la base de datos. esto es por temas de performance de react
                guitar = {guitar} //le pasamos el elemento de la db que es cada guitarra
                //cart = {cart} //no hace falta con la ultima opcion
                addToCart = {addToCart} //le pasamos la funcion al objeto para que pueda modificar el carrito con el boton
              />
            )
          })}
          
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
