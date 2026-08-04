import { RemoveFromCartIcon, ClearCartIcon } from "./Icons";
import type { Product } from "../types";
import './Cart.css'

export const Cart = ({cartList} : {cartList : Product[]}) => {

    return (
    <div className="modal-window">
        <div className="modal-content">
            <h1>Tu carrito:</h1>
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
            <div>
                <button>
                    <ClearCartIcon/>
                </button>
            </div>
        </div>
    </div>
    )
}