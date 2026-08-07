import { createContext, type ReactNode } from "react";
import { useContext } from "react";
import type { Product, CartItem } from "../types";
import { useCartReducer } from "../Hooks/useCartReducer";

type CartContextType = {
    cartList: CartItem[], 
    addToCart : (product: Product) => void
    removeFromCart : (product: CartItem) => void
    clearCart : () => void
    isProductOnCart : (product: Product) => boolean 
    clearAllItems : (product : CartItem | Product) => void
}


const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({children} : {children: ReactNode}) => {

    const {state, addToCart, removeFromCart, clearCart, clearAllItems, isProductOnCart} = useCartReducer()

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