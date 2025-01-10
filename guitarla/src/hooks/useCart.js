
//LOS HOOKS AL LLAMARLOS CON useCart() son instancias de una clase

import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {
    const [data, setData] = useState(db); //como es un archivo local, podemos hacer un useState
  const initialCart = () => {
    //persistencia del carrito, si ya existe un cart en memoria, lo carga, no lo inicializa a vacio como antes, que teniamos el state siempre []
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [cart, setCart] = useState(initialCart); // estado del carrito
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); //cuando el state de cart cambia, se actualiza el localstorage

  function addToCart(item) {
    console.log("xd");
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      //para actualizar la cantidad que hay en el carrito
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
      console.log("Ya existe");
    } else {
      console.log("Agregando");
      item.quantity = 1;
      setCart((prevCart) => [...prevCart, item]); //importante que no mute el estado del original.
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id)); // para mantener todas las guitarras menos la que hemos hecho click en borrar
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      //se aplica a todos los elementos del carrito una funcion la cual comprueba el id, y si coincide, incrementa la cantidad manteniendo todas las caracteristicas del item excepto la cantidad que se ve incrementada.
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item; // default, para todos los que no son el objetivo
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item; // default, para todos los que no son el objetivo
    });
    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]); // facilito
  }

    //state derivada
    const isEmpty = useMemo ( () => cart.length === 0, [cart] ) // esto hace mas eficiente el programa al evitar que toda la pagina se renderice de nuevo constantemente.
    const cartTotal = useMemo ( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart] )

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  };
}