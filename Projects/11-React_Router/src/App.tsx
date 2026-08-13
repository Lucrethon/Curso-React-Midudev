import { useState, useEffect } from "react"
import { EVENTS, URLs } from "./types"
import { HomePage } from "./pages/HomePage"
import { AboutPage } from "./pages/AboutPage"


const App = () => {

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


    return (
        <main>
            <h1>React Router</h1>
            {/* Esto es un Multiple Page Aplitacion porque esta renderizando toda la pagina cada vez que se va a un enlace */}
            {currentPath === (URLs.HOME) && <HomePage/>} 
            {currentPath === (URLs.ABOUT) && <AboutPage/>} 
        </main>
    )
}

export default App