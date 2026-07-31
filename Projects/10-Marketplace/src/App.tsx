import { useState } from "react"
import { Products } from "./Components/Products"
import { useProducts } from "./Hooks/useProducts"
import type { Product, Filter, Category } from "./types"
import { PRODUCT_CATEGORY } from "./types"
import { Header } from "./Components/Header"
import { FilterProvider } from "./Context/filters"
// import mockProducts from "./Mocks/products.json"



const App = () => {
    
    // const productList = mockProducts as ProductList
    const {products, error, loading} = useProducts()
    const [filters, setFilters] = useState<Filter>({
        category: PRODUCT_CATEGORY.all as Category, 
        maxPrice: 1000
    })

    const filterProducts = ({products}: {products: Product[]}) => {
        return (
            products.filter((product)=> {
                return (
                    product.price <= filters.maxPrice && (
                    filters.category === 'all' ||
                    product.category === filters.category
                ))
            })
        )
    }

    const filteredProducts = filterProducts({products})

    return (
        <>
            <FilterProvider setFilter={setFilters}>
                <Header/>
                <div>
                    {
                        loading
                        ? <span>Cargando...</span>
                        : <Products productList={filteredProducts} error={error}/>
                    }
                </div>
            </FilterProvider>
        </>
    )
}

export default App