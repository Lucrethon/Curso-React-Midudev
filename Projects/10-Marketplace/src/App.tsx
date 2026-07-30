import { Products } from "./Components/Products"
import { useProducts } from "./Hooks/useProducts"
import type { ProductList } from "./types"
import mockProducts from "./Mocks/products.json"



const App = () => {
    
    const productList = mockProducts as ProductList
    const {products, error, loading} = useProducts()

    return (
        <>
            <h1>Carrito de Compras</h1>
            <div>
                {
                    loading
                    ? <span>Cargando...</span>
                    : <Products productList={products} error={error}/>
                }
            </div>
        </>
    )
}

export default App