import { createContext, useContext, type ReactNode } from "react";
import type { Filter, Product } from "../types";
import { useFilter } from "../Hooks/useFilter";
import { useProducts } from "../Hooks/useProducts";

// createContext, useContext: te permite pasar props (valores, funciones o estados) de un componente padre a uno hijo
// Todos los componentes que esten dentro de <Context.Provider value={prop}> van a poder utilizar el value (un estado, función, setter, etc)


type FilterContextType = {
    setFilters : React.Dispatch<React.SetStateAction<Filter>>,
    filters : Filter
    filteredProducts : Product[]
}

// Context: 
const FilterContext = createContext<FilterContextType | null>(null);


// type FilterProviderProps = {
//     children : ReactNode,
//     setFilters : React.Dispatch<React.SetStateAction<Filter>>
//     filters : Filter
// }

// para simplificar, aquí se crea un componente en donde ya esta el Context.Provider
// se le pasa el children (componente hijo que va a utilizar la prop) y la prop necesaria 
// un provider al final es un componente 
export const FilterProvider = ({children} : {children: ReactNode}) => {

    const {products} = useProducts()
    const { filteredProducts, setFilters, filters} = useFilter({products})

    return (
        <FilterContext.Provider value={{ filteredProducts, setFilters, filters}}>
            {children}
        </FilterContext.Provider>
    )
}    

// para simplificar, se crea tambien un hook donde ya se use el useContext
// se simplifica la logica de: 
// 1. pasarle el context al useContext (const context = useContext(ContextName));
// 2. Si usas TS e inicializas el default value con null, se puede decir que es null. Dentro del hook haces: 
// if (!context) return null; const { props } = context  
// return context 

export const useFilterContext = () => {
    const context = useContext(FilterContext)
    // el USE CONTEXT ES PARA ESTADOS QUE NO ESTAN CAMBIANDO CONSTANTEMENTE (filtros, modo claro/oscuro, inicios de sesion, etc)

    if (!context) {
        throw new Error('useFilter se debe usar dentro de un FilterContextProvider')
    }

    return context
}