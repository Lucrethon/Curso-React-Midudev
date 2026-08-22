import React, { Children, isValidElement } from "react"
import { URLs } from "../types"
import type { TypeRoute } from "../types"
import { match } from "path-to-regexp"
import { useRouterContext } from "../Context/Router"

export const Router = (
    {
        routes = [], 
        defaultComponent : DefaultComponent, 
        children} : 

    {
        routes: TypeRoute[], 
        defaultComponent: React.ComponentType, 
        children: React.ReactNode}) => {
    
    console.log(children)
    const { currentPath } = useRouterContext()

        // ----------- Funcion para ruta con lenguaje opcional (ej: /es, /en) -----------

    function withOptionalLang(path: string): string {
    // Si es la raíz '/', la ruta queda solo como '{/:lang}'
    if (path === URLs.HOME) return URLs.LANG

    // Si ya tiene un path (/about), lo prefijamos: '{/:lang}/about'
    // cuando una ruta esta entre llaves, significa que es opcional. Ej: {/:lang} significa que puede ser /es o /en o simplemente /
    return `${URLs.LANG}${path}`
    }



    // ------------ Adaptando las rutas que vienen desde el componente children <Route/> -----------------


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
    })?.filter(Boolean) as TypeRoute[] || []// -> array con las rutas 

    // .filter(Boolean) es un trucopara eliminar todos los valores falsos (falsy) de un array
    


    // ------------- Se concatenan las rutas que vienen desde el componente children <Route/> con las rutas que vienen desde el prop routes -------------

    const routesToUse = routesFromChildren ? routes.concat(routesFromChildren) : routes



    // ------------- Se busca la ruta que coincide con la ruta actual del navegador -------------

    // se esta utilizando path-to-regexp para poder detectar rutas dinamicas. Ejemplo: 
    // /search/:query <- :query es una ruta dinamica 

    // se utiliza el metodo find para buscar la ruta que coincide con la ruta actual del navegador (currentPath)

    let routeParameters = {}

    const matchedRoute = routesToUse.find(({ path }) => {

        // if (currentPath === path) return true
        if (!path) return false

        const fullPath = withOptionalLang(path)
        const matherUrl = match(fullPath, {decode: decodeURIComponent})
        const matched = matherUrl(currentPath)
        if (!matched) return false
        //search/:query

        // aqui se guardan los parámetros de url que son dinamicos (:query, :lang) extraidos con path-to-regexp
        routeParameters = matched.params // {query : 'javascript'} // /search/javascript
        return true // esto es para que find pueda devolver el componente correspondiente a la ruta dinamica

    })

    const Page = matchedRoute?.Component

    return Page 
    ? <Page routeParameters={routeParameters}/> 
    : <DefaultComponent/>
}
