import type { Product } from "../types"
import { AddToCartIcon } from "./Icons"
import "./Product.css"

export const Products = ({productList} : {productList: Product[]}) => {

    return(
        <main className="product-list">
        <ul>
            {productList.map((product) =>{
                return (
                    <li key={product.id} className="product">
                        <img src={product.thumbnail} alt={`Image of ${product.title}`}></img>
                        <div>
                            <strong className="product-title">{product.title}</strong>
                            <p className="product-description">{product.description}</p>
                            <p className="product-stock">{`Stock: ${product.stock}`}</p>
                            <p className="product-price">{`Price: ${product.price}`}</p>
                        </div>
                        <div>
                            <button>
                                <AddToCartIcon/>
                            </button>
                        </div>
                    </li>
                )
                })
            }
        </ul>
        </main>
    )

}