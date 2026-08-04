
import { Products } from "./Components/Products"
import { useProducts } from "./Hooks/useProducts"
import { Header } from "./Components/Header"
import { Footer } from "./Components/Footer"
// import { useFilter } from "./Hooks/useFilter"
import { useFilterContext } from "./Context/filters"
// import mockProducts from "./Mocks/products.json"
import { FooterCart } from "./Components/FooterCart"



const App = () => {
    
    // const productList = mockProducts as ProductList
    
    // fetching de productos 
    const { error, loading } = useProducts()

    
    // CUALQUIER COMPONENTE QUE USE usefilterContext DEBE ESTAR ENCAPSULADO POR EL PROVIDER
    // INCLUSIVE APP 

    // productos ya filtrados
    const {filteredProducts} = useFilterContext()

    return (
        <>
            <Header/>
            {
                loading
                ? <span>Cargando...</span>
                : <Products productList={filteredProducts} error={error}/>
            }
            <Footer/>
            <FooterCart/>

        </>
    )
}

export default App