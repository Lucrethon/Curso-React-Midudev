import type { CartItem, Product } from "../types"
import { useReducer } from "react"
import { cartReducer, initialState } from "../reducers/cartReducer"

export const useCartReducer = () => { 
    const [state, dispatch] = useReducer(cartReducer, initialState)
    // dispatch se encarga de enviar las acciones al reducer 

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

    return {state, addToCart, removeFromCart, clearCart, clearAllItems, isProductOnCart}
}