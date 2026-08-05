import React, { createContext, type ReactNode } from "react";
import { useState, useContext } from "react";
import type { Product } from "../types";

type CartContextType = {
    cartList: Product[], 
    setCartList: React.Dispatch<React.SetStateAction<Product[]>>,
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({children} : {children: ReactNode}) => {
    const [cartList, setCartList] = useState<Product[]>([])

    return (
        <CartContext.Provider value={{cartList, setCartList}}>
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