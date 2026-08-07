import React, { createContext, type ReactNode } from "react";
import { useState, useContext } from "react";
import type { Product, CartItem } from "../types";
import { useReducer } from "react";

type CartContextType = {
    cartList: CartItem[], 
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


const initialState = [] as CartItem[]
const cartReducer = (state: CartItem[], action: CartAction) => {


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
            else return state.filter(item => item.id !== product.id)
            // filtra todos mos productos que NO tengan el id del producto que se quiere sacar 
            // filter crea un array nuevo, por lo que no muta el estado original 
        }

    default: return state

    }
    
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({children} : {children: ReactNode}) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)
    // dispatch se encarga de enviar las acciones al reducer 

    // const [cartList, setCartList] = useState<CartItem[]>([])

    const addToCart = (product: Product) => dispatch({
        type: 'ADD_TO_CART', 
        payload: product
    })

    const removeFromCart = (product: CartItem) => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({
        type: 'CLEAR_CART'
    })

    const clearAllItems = (product : CartItem | Product) => dispatch({
        type: 'CLEAR_ALL_ITEMS', 
        payload: product
    })


    const isProductOnCart = (product: Product) => {
        const productInCart = state.find((item) => item.id === product.id) // falsy or truty
        return !!productInCart
    }

    return (
        <CartContext.Provider value={{
        cartList: state, 
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