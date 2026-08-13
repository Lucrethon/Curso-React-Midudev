import type React from "react"
import { EVENTS, TARGET } from "../types"
// import type { Urls } from "../types"

// Que debemos hacer para hacer una single page aplication? 
export const navigate = (href: string) => {
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

export const Link = ({ target = TARGET.SELF, to, children, ...props} : {target?: string, to: string, children: React.ReactNode}) => {
    // target: si se quiere abrir en otra ventana 
    // to: el destino del link
    // ...props: props que se le pasan al ancor (className, etc etc)


    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        // es importante el prevent default porque si no se coloca, se renderiza toda la pagina otra vez como si fuera un multiple page aplication 
       navigate(to) 
    }
    return <a onClick={handleClick} href={to} target={target} {...props}>{children}</a>

}