import { createContext, useContext, type ReactNode } from "react";
import type { Filter } from "../types";

type FilterContextType = {
    setFilters : React.Dispatch<React.SetStateAction<Filter>>
}

const FilterContext = createContext<FilterContextType | null>(null);


type FilterProviderProps = {
    children : ReactNode,
    setFilters : React.Dispatch<React.SetStateAction<Filter>>
}

export const FilterProvider = ({children, setFilters} : FilterProviderProps) => {
    return (
        <FilterContext.Provider value={{setFilters}}>
            {children}
        </FilterContext.Provider>
    )
}   

export const useFilter = () => {
    const context = useContext(FilterContext)

    if (!context) {
        throw new Error('useFilter se debe usar dentro de un FilterContextProvider')
    }

    return context
}