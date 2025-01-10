import Header from "./components/Header";
import Guitar from "./components/Guitar";
import {useCart} from './hooks/useCart.js'

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

  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  } = useCart()

  // console.log(db)
  //data es un array

  // useEffect(() => { //pero de normal con APIs y tal, mejor useEffect.
  //   setData(db)
  // }, [])




  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitar
                key={guitar.id} //para arreglar el erroro del key unico de react, puedes usar el id unico de cada elemento de la base de datos. esto es por temas de performance de react
                guitar={guitar} //le pasamos el elemento de la db que es cada guitarra
                //cart = {cart} //no hace falta con la ultima opcion
                addToCart={addToCart} //le pasamos la funcion al objeto para que pueda modificar el carrito con el boton
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
