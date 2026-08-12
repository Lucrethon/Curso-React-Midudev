import { useState, useEffect } from "react"

const EVENTS = {
    NavigationEvent : 'push state'
}

// Que debemos hacer para hacer una single page aplication? 
const navigation = (href: string) => {
    // el objeto history de window sirve para interactuar y manipular el historial de navegación de la pestaña actual del navegador.
    // pero para cambiarla y no hacer una recarga completa de la página utilizamos el método pushState
    // pushState Añade una nueva entrada al historial de navegación y cambia la URL en la barra de direcciones sin recargar la página. Ejemplo: 


    // Si estás en misitio.com y ejecutas esto:
    // history.pushState({ seccion: "contacto" }, "", "/contacto");

    // La URL cambia a misitio.com/contacto sin parpadear ni recargar la página.

    window.history.pushState({}, '', href)
    // crear evento personalizado para avisar que hemos cambiado de URL
    const navigationEvent = new Event(EVENTS.NavigationEvent)
    // enviar el evento 
    window.dispatchEvent(navigationEvent)

}

const HomePage = () => {
    return (
        <>
            <h1>Home</h1>
            <p>Pagina de ejemplo para crear un React Router desde cero hecha por Super Lulu</p>
            <button onClick={() => navigation('./about')}>Sobre Mi</button>
        </>
    )
}

const AboutPage = () => {
    return (
        <>
            <h1>About</h1>
            <div>
                <p>Soy Super Lulu y estoy creando un clon de React Router</p>
                <img src="https://avatars.githubusercontent.com/u/191651326?v=4" alt="Foto de SuperLulu"/>
            </div>
            <button onClick={() => navigation('./home')}>Ir Al Home</button>
        </>
    )
}


const App = () => {

    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        // escuchar el evento de navegación 
        window.addEventListener(EVENTS.NavigationEvent, onLocationChange)

        // remover el evento 
        return () => {
            window.removeEventListener(EVENTS.NavigationEvent, onLocationChange)
        }

        // cuando se va a remover un evento, SE TIENE que guardar el callback en una funcion aparte (onLocationChange en este caso)

    }, [])


    return (
        <main>
            <h1>React Router</h1>
            {/* Esto es un Multiple Page Aplitacion porque esta renderizando toda la pagina cada vez que se va a un enlace */}
            {currentPath === '/home' && <HomePage/>} 
            {currentPath === '/about' && <AboutPage/>} 
        </main>
    )
}

export default App