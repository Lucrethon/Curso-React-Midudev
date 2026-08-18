import { useEffect } from "react"
import type { Params } from "../types"


export const SearchPage = ({routeParameters} : {routeParameters: Params}) => {

    // al tener la query, podemos hacer con un useEffect un fetchin de datos para las busquedas 
    useEffect(() => {
        document.title = `${routeParameters.query} search`
    }, [])

    return (
        <h1><h1>Has buscado {routeParameters.query}</h1></h1>
    )
}    