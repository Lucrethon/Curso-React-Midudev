import React, { createContext, type ReactNode } from "react";
import { useState, useContext } from "react";
import type { Product, CartItem } from "../types";
import { Products } from "../Components/Products";

type CartContextType = {
    cartList: Product[], 
    setCartList: React.Dispatch<React.SetStateAction<CartItem[]>>,
    addToCart : (product: Product) => void
    removeFromCart : (product: CartItem) => void
    clearCart : () => void
    isProductOnCart : (product: Product) => boolean 
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({children} : {children: ReactNode}) => {

    const [cartList, setCartList] = useState<CartItem[]>([])

    const addToCart = (product: Product) => {


        if (isProductOnCart(product)) { // si el rpoducto ya existe en el carrito, solo se actualiza la cantidad 
            setCartList(prevState => prevState.map(
                (item) => item.id === product.id
                ? {... item, quantity: item.quantity + 1}
                : item
            ))
        }
        else setCartList(prevState => [
            ...prevState, // 1. Desempaqueta todos los elementos que YA estaban en el carrito
            {             // 2. Agrega este NUEVO objeto (product) al final del arreglo
                ...product, 
                quantity: 1 // 3. añadiendole la propiedad quantity
            }
        ])

    }

    const removeFromCart = (product: CartItem) => {

        //  const productInCartIndex = cartList.findLastIndex((item) => item.id == product.id) // number

        if (product.quantity > 1) {
            setCartList(prevState => prevState.map(
                (item) => item.id === product.id
                ? {... item, quantity: item.quantity - 1}
                : item
        ))
        }

        else setCartList(prevState => prevState.filter(item => item.id !== product.id))
        // filtra todos mos productos que NO tengan el id del producto que se quiere sacar 
        // filter crea un array nuevo, por lo que no muta el estado original 
    }

    const isProductOnCart = (product: Product) => {
        const productInCart = cartList.find((item) => item.id === product.id) // falsy or truty
        return !!productInCart
    }

    const clearCart = () => {
        setCartList([])
    }

    return (
        <CartContext.Provider value={{
        cartList, 
        setCartList, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        isProductOnCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error("useCartContext solo se puede usar dentro de CartContext.Provider")
    }

    return context
}