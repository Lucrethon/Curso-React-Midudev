import type React from "react"
import { EVENTS, TARGET, BUTTONS } from "../types"


export const Link = ({ target = TARGET.SELF, to, children, ...props} : {target?: string, to: string, children: React.ReactNode}) => {
    // target: si se quiere abrir en otra ventana 
    // to: el destino del link
    // ...props: props que se le pasan al ancor (className, etc etc)


    const handleClick = (event: React.MouseEvent) => {

        // para que funcionen las opciones de accecibilidad se realizan las siguientes comprobaciones: 

        // si es el evento o click principal 
        const isMainEvent = event.button === BUTTONS.PRIMARY // primary click

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