import { useEffect } from "react"
import type { Query } from "../types"


export const SearchPage = ({queryRoutes} : {queryRoutes: Query}) => {

    // al tener la query, podemos hacer con un useEffect un fetchin de datos para las busquedas 
    useEffect(() => {
        document.title = `${queryRoutes.query} search`
    }, [])

    return (
        <h1><h1>Has buscado {queryRoutes.query}</h1></h1>
    )
}    