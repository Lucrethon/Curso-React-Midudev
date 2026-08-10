import type { Product } from "../types"
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons"
import "./Product.css"
import { useCartContext } from "../Context/cart"

const ProductList = ({productList} : {productList: Product[]}) => {

    const {addToCart, isProductOnCart, clearAllItems} = useCartContext()

    return(
        <main className="products">
        <ul>
            {productList.map((product) =>{
                return (
                    <li key={product.id} className="product" data-category={product.category} data-price={product.price}>
                        <img src={product.thumbnail} alt={`Image of ${product.title}`}></img>
                        <div className="product-info">
                            <h3 className="product-title">{product.title}</h3>
                            {/* <span className="product-description">{product.description}</span> */}
                            <span className="product-price">{`Price: $${product.price}`}</span>
                        </div>
                        <div>
                            {
                                isProductOnCart(product)
                                ? <button style={{backgroundColor: "red"}} onClick={() => clearAllItems(product)} className="button-remove-from-cart"><RemoveFromCartIcon/></button>
                                : <button style={{backgroundColor: "blue"}} onClick={() => addToCart(product)} className="button-add-to-cart"><AddToCartIcon/></button>
                            }
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