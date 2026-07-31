
import { Products } from "./Components/Products"
import { useProducts } from "./Hooks/useProducts"
import { Header } from "./Components/Header"
import { FilterProvider } from "./Context/filters"
import { useFilter } from "./Hooks/useFilter"
// import mockProducts from "./Mocks/products.json"



const App = () => {
    
    // const productList = mockProducts as ProductList
    
    // fetching de productos 
    const {products, error, loading} = useProducts()
    // productos filtrados
    const {filteredProducts, setFilters} = useFilter({products})

    return (
        <>
            <FilterProvider setFilters={setFilters}>
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