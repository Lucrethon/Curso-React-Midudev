import React, { useState, useEffect } from "react"
import { EVENTS } from "../types"
import type { Route } from "../types"
import { match } from "path-to-regexp"


export const Router = ({routes, defaultComponent : DefaultComponent} : 
    {routes: Route[], defaultComponent: React.ComponentType}) => {

    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {
        // settear el state currentPath con la ubicación actual del navegador
        // se utiliza un useEffect para que se actualice cuando cambie el estado 
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        // escuchar el evento de navegación 
        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
        // escuchar el evento para navegar hacia atrás o hacia adelante (evento popstate)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)

        // limpiar los eventos
        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }

        // cuando se va a remover un evento, SE TIENE que guardar el callback en una funcion aparte (onLocationChange en este caso)

    }, [])

    // se esta utilizando path-to-regexp para poder detectar rutas dinamicas. Ejemplo: 
    // /search/:query <- :query es una ruta dinamica 

    let queryRoutes = {}

    const Page = routes.find(({ path }) => {
        if (currentPath === path) return true
         
        const matherUrl = match(path, {decode: decodeURIComponent})
        const matched = matherUrl(currentPath)
        if (!matched) return false
        //search/:query

        // aqui se guardan los parámetros de url que son dinamicos (:query) extraidos con path-to-regexp
        queryRoutes = matched.params // {query : 'javascript'} // /search/javascript
        return true // esto es para que find pueda devolver el componente correspondiente a la ruta dinamica

    })?.Component

    return Page 
    ? <Page queryRoutes={queryRoutes}/> 
    : <DefaultComponent/>
}
