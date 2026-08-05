import type { Product } from "../types"
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons"
import "./Product.css"
import { useCartContext } from "../Context/cart"

const ProductList = ({productList} : {productList: Product[]}) => {

    const {addToCart, isProductOnCart} = useCartContext()

    return(
        <main className="products">
        <ul>
            {productList.map((product) =>{
                return (
                    <li key={product.id} className="product">
                        <img src={product.thumbnail} alt={`Image of ${product.title}`}></img>
                        <div className="product-info">
                            <h3 className="product-title">{product.title}</h3>
                            {/* <span className="product-description">{product.description}</span> */}
                            <span className="product-stock">{`Stock: ${product.stock}`}</span>
                            <span className="product-price">{`Price: $${product.price}`}</span>
                        </div>
                        <div>
                            <button onClick={() => addToCart(product)}>
                                {
                                    isProductOnCart(product)
                                    ? <RemoveFromCartIcon/>
                                    : <AddToCartIcon/>
                                }
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

export const Products = ({productList, error} : {
    productList: Product[], 
    error: string
}) => {

    const hasProducts = productList.length > 0

    return (
        hasProducts
        ? <ProductList productList={productList}/>
        : <p>{error}</p>
    )
}