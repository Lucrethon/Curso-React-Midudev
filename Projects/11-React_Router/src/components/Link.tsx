import type React from "react"
import { EVENTS, TARGET } from "../types"
// import type { Urls } from "../types"

// Que debemos hacer para hacer una single page aplication (SPA)? 
export const navigate = (href: string) => { // funcion para navegar con SPA

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

        // para que funcionen las opciones de accecibilidad se realizan las siguientes comprobaciones: 

        // si es el evento o click principal 
        const isMainEvent = event.button === 0 // primary click

        // si el evento esta modificado (es decir, si no se esta abriendo el link con click sino con un comando por ejemplo. Ej: mayuscula + click abre en otra ventana)
        // esto es para que el usuario pueda realizar esas acciones en nuestra pagina 
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey

        // si se está abriendo en la misma pestaña (comportamiento por defecto)
        const isManageableEvent = target === undefined || target === TARGET.SELF

        if (isMainEvent && !isModifiedEvent && isManageableEvent) {
            // si estas condiciones se cumplen, se hace la navegación son single page aplication 

            event.preventDefault()
            // es importante el prevent default porque si no se coloca, se renderiza toda la pagina otra vez como si fuera un multiple page aplication 
            navigate(to) // navegacion con single page aplication 
        } 
       
    }
    return <a onClick={handleClick} href={to} target={target} {...props}>{children}</a>

}