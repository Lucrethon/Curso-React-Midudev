import { RemoveFromCartIcon, ClearCartIcon } from "./Icons";
import type { Product } from "../types";
import './Cart.css'
import { useModalContext } from "../Context/modal";

export const Cart = ({cartList} : {cartList : Product[]}) => {

    const { setIsModalOpen} = useModalContext()
    const handleClick = () => {
        setIsModalOpen(prevState => !prevState)
    }

    const totalPrice = () => {
        let total = 0
        cartList.forEach((product: Product) => {
            total += product.price
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
                {cartList.map((product: Product) => {
                    return (
                        <li key={product.id}>
                            <img src={product.thumbnail} alt={`Image of ${product.title}`}></img>
                            <div className="product-info">
                                <h3 className="product-title">{product.title}</h3>
                                <span className="product-price">{`Price: $${product.price}`}</span>
                            </div>
                            <div className="remove-item-button">
                                <button>
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
                    <button>
                        <ClearCartIcon/>
                    </button>
                    <button onClick={handleClick}>Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    )
}