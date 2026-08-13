export const EVENTS = {
    PUSHSTATE : 'pushstate',
    POPSTATE : 'popstate'
}

export const TARGET = {
    BLANK : '_blank',
    SELF : '_self', 
    PARENT : '_parent', 
    TOP: '_top'
}

export type Target = '_blank' | '_self' | '_parent' | '_top'


// target : sirve para especificar dónde o cómo se debe abrir el enlace (el documento de destino) cuando el usuario hace clic en él.

    // _blank: Abre el enlace en una nueva pestaña o ventana del navegador. Es ideal para enlaces externos si no quieres que el usuario abandone tu sitio web.

    // _self: Abre el enlace en la misma pestaña o ventana donde se hizo clic. Es el comportamiento por defecto si no incluyes el atributo target.

    // _parent: Abre el enlace en el marco o contenedor padre (parent frame) del documento actual. Se usa principalmente cuando se trabajan con <iframe>.

    // _top: Abre el enlace en el cuerpo completo de la ventana (full body), rompiendo cualquier estructura de marcos o iframe en la que esté anidado.

export type Urls = '/' | '/about'

export const URLs = {
    HOME : '/',
    ABOUT : '/about'
}


