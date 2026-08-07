import React, { createContext, type ReactNode } from "react";
import { useState, useContext } from "react";
import type { Product, CartItem } from "../types";
import { useReducer } from "react";

type CartContextType = {
    cartList: CartItem[], 
    setCartList: React.Dispatch<React.SetStateAction<CartItem[]>>,
    addToCart : (product: Product) => void
    removeFromCart : (product: CartItem) => void
    clearCart : () => void
    isProductOnCart : (product: Product) => boolean 
    clearAllItems : (product : CartItem | Product) => void
}

type AddToCart = {
    type: 'ADD_TO_CART'
    payload: Product
} 

type RemoveFromCart = {
    type: 'REMOVE_FROM_CART'
    payload: CartItem
}

type ClearCart = {
    type: 'CLEAR_CART'
}

type ClearAllItems = {
    type: 'CLEAR_ALL_ITEMS'
    payload: Product | CartItem
}

type CartAction = 
    |AddToCart
    |RemoveFromCart
    |ClearCart
    |ClearAllItems;



const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({children} : {children: ReactNode}) => {

    const [cartList, setCartList] = useState<CartItem[]>([])

    

    const initialState = [] as CartItem[]
    const cartReducer = ({state, action}: {state: CartItem[], action: CartAction}) => {


        const isProductOnCart = (product: Product) => {
            const productInCart = state.find((item) => item.id === product.id) // falsy or truty
            return !!productInCart
        }

        switch (action.type) {

            case 'CLEAR_CART': {
                return initialState
            }

            case 'CLEAR_ALL_ITEMS': {
                const product = action.payload
                return state.filter(item => item.id !== product.id)
            }

            case 'ADD_TO_CART': {
                const product = action.payload
                if (isProductOnCart(product)) { // si el rpoducto ya existe en el carrito, solo se actualiza la cantidad 
                    return state.map(
                        (item) => item.id === product.id
                        ? {... item, quantity: item.quantity + 1}
                        : item
                    )
                }
                else return [
                    ...state,       // 1. Desempaqueta todos los elementos que YA estaban en el carrito
                    {               // 2. Agrega este NUEVO objeto (product) al final del arreglo
                        ...product, 
                        quantity: 1 // 3. añadiendole la propiedad quantity
                    } as CartItem
                ]
            }

            case 'REMOVE_FROM_CART': {
                const product = action.payload
                 if (product.quantity > 1) {
                    return state.map(
                        (item) => item.id === product.id
                        ? {... item, quantity: item.quantity - 1}
                        : item
                )
                }
                else state.filter(item => item.id !== product.id)
            }

        }
        
    }

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
            } as CartItem
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

        else clearAllItems(product)
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

    const clearAllItems = (product : CartItem | Product) => {
        setCartList(prevState => prevState.filter(item => item.id !== product.id))
    }   

    return (
        <CartContext.Provider value={{
        cartList, 
        setCartList, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        isProductOnCart, 
        clearAllItems
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