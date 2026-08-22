import { useState, useEffect } from "react"
import { EVENTS } from "../types"

export const useRouter = () => {

     // --------------- Estado para guardar la ruta actual del navegador ---------------
    
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

        // Que debemos hacer para hacer una single page aplication (SPA)? 
        const navigate = (href: string) => { // funcion para navegar con SPA
        
            // el objeto history de window sirve para interactuar y manipular el historial de navegación de la pestaña actual del navegador.
            // pero para cambiarla y no hacer una recarga completa de la página utilizamos el método pushState
            // pushState Añade una nueva entrada al historial de navegación y cambia la URL en la barra de direcciones sin recargar la página. Ejemplo: 
        
        
            // Si estás en misitio.com y ejecutas esto:
            // history.pushState({ seccion: "contacto" }, "", "/contacto");
        
            // La URL cambia a misitio.com/contacto sin parpadear ni recargar la página.
        
            window.history.pushState({}, '', href)
            // crear evento personalizado para avisar que hemos cambiado de URL
            const navigationEvent = new Event(EVENTS.PUSHSTATE)
            // enviar el evento 
            window.dispatchEvent(navigationEvent)
        
        }

        return { currentPath, navigate }

}