import type { Product } from "../types"
import { AddToCartIcon } from "./Icons"
import "./Product.css"

export const Products = ({productList} : {productList: Product[]}) => {

    return(
        <main className="products">
        <ul>
            {productList.map((product) =>{
                return (
                    <li key={product.id} className="product">
                        <img src={product.thumbnail} alt={`Image of ${product.title}`}></img>
                        <div>
                            <h3 className="product-title">{product.title}</h3>
                            <span className="product-description">{product.description}</span>
                            <span className="product-stock">{`Stock: ${product.stock}`}</span>
                            <span className="product-price">{`Price: ${product.price}`}</span>
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