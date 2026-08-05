import { RemoveFromCartIcon, ClearCartIcon } from "./Icons";
import './Cart.css'
import { useModalContext } from "../Context/modal";
import { useCartContext } from "../Context/cart";

export const Cart = () => {

    const {cartList, removeFromCart, addToCart, clearCart, clearAllItems} = useCartContext()

    const { setIsModalOpen} = useModalContext()
    const handleClick = () => {
        setIsModalOpen(prevState => !prevState)
    }

    const totalPrice = () => {
        let total = 0
        cartList.forEach((product) => {
            total += (product.price * product.quantity)
        })
        return total.toFixed(2)
    }

    return (
    <div className="modal-window">
        <div className="modal-content">
            <div className="cart-header">
                <h1>Tu carrito:</h1>
            </div>
            <ul>
                {cartList.map((product) => {
                    return (
                        <li key={product.id}>
                            <img src={product.thumbnail} alt={`Image of ${product.title}`}></img>
                            <div className="product-info">
                                <h3 className="product-title">{product.title}</h3>
                                <span className="product-price">{`Price: $${product.price}`}</span>
                                <div className="product-quantity">
                                    <button onClick={() => removeFromCart(product)}>-</button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => addToCart(product)}>+</button>
                                </div>
                            </div>
                            <div className="remove-item-button">
                                <button onClick={() => clearAllItems(product)}>
                                    <RemoveFromCartIcon/>
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className='cart-footer'>
                <div>
                    <strong>{`Total: $${totalPrice()}`}</strong>
                </div>
                <div className="buttons-container">
                    <button onClick={clearCart}>
                        <ClearCartIcon/>
                    </button>
                    <button onClick={handleClick}>Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    )
}