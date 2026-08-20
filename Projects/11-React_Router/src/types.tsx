import type React from "react"
import { SearchPage } from "./pages/SearchPage"
import AboutPage from "./pages/AboutPage"

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

// target : sirve para especificar dónde o cómo se debe abrir el enlace (el documento de destino) cuando el usuario hace clic en él.

    // _blank: Abre el enlace en una nueva pestaña o ventana del navegador. Es ideal para enlaces externos si no quieres que el usuario abandone tu sitio web.

    // _self: Abre el enlace en la misma pestaña o ventana donde se hizo clic. Es el comportamiento por defecto si no incluyes el atributo target.

    // _parent: Abre el enlace en el marco o contenedor padre (parent frame) del documento actual. Se usa principalmente cuando se trabajan con <iframe>.

    // _top: Abre el enlace en el cuerpo completo de la ventana (full body), rompiendo cualquier estructura de marcos o iframe en la que esté anidado.


export const BUTTONS = {
    PRIMARY : 0 // primary button
}

 export type Lang = 'es' | 'en'

 export const Langs = {
    spanish : 'es' as Lang, 
    english : 'en' as Lang
 }

// ------------- URLs -----------------

export const URLs = {
    HOME : '/',
    ABOUT : '/about',
    SEARCH : '/search/:query', // search/javascript , search/python , search/react aqui solo estamos capturando el query
    //Los dos puntos (:) son una convención de sintaxis para patrones de ruta:
    // Texto normal (/search): Debe coincidir exactamente con la palabra "search".

    // Dos puntos (:query): Le dice a la librería:
    // "Aquí viene un comodín dinámico. Cualquier valor que el usuario ponga en este segmento de la URL, guárdamelo bajo una clave llamada query".
    LANG: '{/:lang}'
}

// ------------- Routes -----------------

export type TypeRoute = {
    path: string,
    Component: React.ComponentType<any>
    // aqui tambien se puede hacer un type para definir de forma mas especifica que tipo de props requiere la pagina 
    // esto es para pasar una ruta con parámetros 
}

export const routes: TypeRoute[] = [
    // {
    //     path: URLs.HOME,
    //     Component: HomePage
    // },
    // {
    //     path: URLs.ABOUT,
    //     Component: AboutPage
    // },
    {
        path: URLs.SEARCH,
        Component: SearchPage
    },
    {
        path: URLs.LANG + URLs.ABOUT,
        Component: AboutPage
    }
    
]

// esto es un type de un parametro de una ruta con parametros 
export type Params = {
    query: string,
    lang: Lang
}


// i18n 

export type HomePage = {
    description: string;
    navigate:    string;
}


export type AboutPage = {
    title:       string;
    description: string;
    button:      string;
    navigate:    Navigate;
}

export type Navigate = {
    selectLanguage:  string;
    languageOptions: LanguageOptions;
}

export type LanguageOptions = {
    spanish: string;
    english: string;
}

export type Pages = {
    aboutPage: AboutPage;
    homePage:  HomePage;
}

export type I18n = {
    es: Pages;
    en: Pages;
}




