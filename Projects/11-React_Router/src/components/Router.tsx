import React, { useState, useEffect, Children, isValidElement } from "react"
import { EVENTS } from "../types"
import type { TypeRoute } from "../types"
import { match } from "path-to-regexp"


export const Router = ({routes, defaultComponent : DefaultComponent, children} : 
    {routes: TypeRoute[], defaultComponent: React.ComponentType, children: React.ReactNode}) => {
    
    console.log(children)

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


    // añadir las rutas que viene desde el componente children <Route/>
    // se hace ITERANDO los childrens que recibe el Router (componentes Route)
    // y se accede a las props del children 
    // en este caso, las props del componente Route son el path y el componente 
    // para iterar sobre los children, se utiliza una utilidad de react llamada Children 

    // con el objeto Children de React se pueden leer las props 

    const routesFromChildren = Children.map(children, (child) => {
        // el Children.map recibe dos argumentos: el children como tal y el callback 

        if (!isValidElement(child)) return null
        // isValidElement es una función de React que valida si el children es un elemento válido de React.

        // asegurarse que el nombre del children es Route 
        const { props, type } = child
        const componentName = typeof type === "function" ? type.name : null;
        // se valida que route es una funcion mediante su propiedad type
        // child.type no es un objeto plano {}: es la función Route misma.
        // una vez validado, se accede a su propiedad name para validar que sea Route 
        // type: function 

        const isRoute = componentName === 'Route'

        return isRoute ? (props as TypeRoute) : null
    }) // -> array con las rutas 


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
