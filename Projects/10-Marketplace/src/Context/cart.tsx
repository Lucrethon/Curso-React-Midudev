import { createContext, type ReactNode } from "react";
import { useContext } from "react";
import type { Product, CartItem } from "../types";
import { useReducer } from "react";
import { cartReducer, initialState } from "../reducers/cartReducer";

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