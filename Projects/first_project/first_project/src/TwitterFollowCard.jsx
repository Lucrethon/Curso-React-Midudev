import './App.css'
import "react"
import { useState } from 'react'


// Una Twitter Card tiene 4 elementos importantes: 

// 1. Foto de perfil
// 2. Nombre de usuario
// 3. Cuenta
// 4. Boton de seguir

// Ejercicio: Crear una Twitter Card con los 4 elementos mencionados

// ------------- componente Article ------------

// Componente <article> en HTML: es una etiqueta semántica que se utiliza para envolver un contenido que es autónomo, independiente y reutilizable.

// Significa que si quiero tomar ese bloque de contenido y ponerlo en otra página web o en un lector de noticias (RSS), el texto seguiría teniendo sentido por sí mismo. Se utiliza cuando: 

// Artículos de blog o noticias.
// Publicaciones en redes sociales (un tweet, un post de Facebook).
// Comentarios de usuarios (sí, un comentario dentro de un foro o blog puede ser un <article> por sí mismo).
// Tarjetas de producto (product cards) en una tienda en línea.
// Cualquier entrada en un foro de discusión.


// ------------- Componente Strong ----------------

// El componente <strong> en HTML es una etiqueta semántica que se utiliza para indicar que un texto tiene una gran importancia, seriedad o urgencia.

// Por defecto, los navegadores web renderizan el texto dentro de <strong> en negrita, pero su verdadero valor no es estético, sino el significado que le da al contenido. Se usa para: 

// Alertar al usuario
// Destacar términos críticos.

// ---------------- Componente Span ---------------

// es un elemento genérico y sin ningún significado semántico. Su única función es servir como un contenedor de línea (inline)

// ------------------ Componente Aside -----------------

// El componente <aside> en HTML es otra etiqueta semántica que se utiliza para envolver contenido que está tangencialmente relacionado con el contenido principal que lo rodea, pero que perfectamente podría separarse de este.
// equivale a las típicas barras laterales de una página web


export function TwitterCard ({ formatUsername, children, accountName = "unknown", avatarUrl }) { // Este componente lo tenemos que EXPORTAR para poder usarlo en otro archivo

    
    // -------------- Hooks -----------------
    // Los hooks permiten añadir cierta funcionalidad a los componentes de react 
    // o ejecutar codigo arbitrario cuando ocurren ciertas cosas en los componentes 
    // o para mejorar el rendimiento de los componentes

    // ---------------- Estados en React -------------

    // Para usar los estados en React, se tiene que importar el Hooñ llamado useState
    // useState permite guardar una variable que nos permite saber el estado del usuario
    // el useState es un array: 
    // [estado actual, funcion para cambiar estado actual]

    // aqui se aplica la destructurarion: el useState es un array. Lo que hacemos nosotros es darle nombre a esos valores que estan dentro del array 
    const [isFollowing, setIsFollowing] = useState(false) // el parentesis es el estado inicial

    // Esto ya hace que React sea dinamico y responda ante los cambios del usuario: pasarle funciones a los elementos dependiendo del estado en el que se encuentre

    console.log(isFollowing);

    const text = isFollowing ? "Following" : "Follow"; 

    //Esto es un estado interno: esta a nivel de cada uno de los elementos que crea el componente 

    const buttonClassName = isFollowing 
    ? `tw-followCard-followButton is-following` 
    : `tw-followCard-followButton notFollowing`;

    const handleClick = () => {
        setIsFollowing(!isFollowing)
        // El operador ! lee la variable isFollowing y la invierte 
    }
    // -------Operador ternario --------
    // Sintaxis: condición ? si_es_verdadero : si_es_falso


    // ------------ Funciones como props ------------------

        // que pasa si se quiere pasar una función a un prop?
      // que pasa si se quiere hacer desde afuera? Es decir, pasar funciones como props
      //eso se tiene que estipular dentro del JSX para que cuando se pase como prop desde afuera, esta pueda funcionar

      // ---------------- Importante --------------
      // las props de un componente JSX tienen que ser INMUTABLES
      // Es una mala práctica cambiar el valor de una prop 
      // Es como modificar la fuente de la verdad 

      // ----------- Childrens -------------

      // children es un elemento que se envuelve y se puede pasar como una prop (fijarse en username)
      // la palabra reservada es children

      // --------- Valores por defecto -----------

      // a veces puede que no venga un valor que esta estipulado en las props
      // para eso se hace como si fuera una función normal: en los parametros, se hace: 
      // parametro = valorPorDefecto

    return (
    <article className="tw-followCard">
    <header className='tw-followCard-header'>
        <img 
        alt="Avatar" 
        className="tw-followCard-avatar" 
        src={avatarUrl}>
        </img>
        <div className="tw-followCard-info">
            <strong className="tw-followCard-name">{children}</strong>
            <span className="tw-followCard-username">{formatUsername(accountName)}</span>
        </div>
    </header>

    <aside>
        <button className={buttonClassName}
        onClick={handleClick}>
            {text}
            {/* Este texto se llama children porque es un texto envuelto por un boton que a su vez esta envuelto por un aside (contenedor padre) */}
        </button>
    </aside>

    </article>
    );
};

// Este componente ya es reutilizable 

// -------------- Recomendación CSS -----------

// Una buena practica para crear componentes reutilizables es no agregar un margin al estilo original porque hay que considerar que ese componente se puede utilizar de forma aislada en otro lugar 

// La mejor practica es que, cuando lo vayas a utilizar, cargarlo en un div, section, etc, y que ese estilo de separacion sea de la pagina, no del componente 

// Hay una pagina llamada Chakra que te da componentes de React ya estilizados 

// ----------- className --------------

// Para evitar seleccionar un elemento HTML completo, hay que seleccionar los elementos por clases y hay que crearle a cada elemento su propia clase
// Para eso se utiliza "className" (pascalCase)
// Lo ideal es que se utilicen abreviaciones para que todos los elementos hijos tengan el mismp nombre del padre


// ------------------- Estados en React -----------------

// Para que los componentes cobren vida, se manejan mediante estados. Como un interruptor de luz: encendido | apagado
// Estos estados tienen que responder a los cambios que hace el usuario 

// --------------- Renderizado condicional ------------------

// Dependiendo de lo que se haga o del estado en que se encuentre algo, se necesita que se renderice una cosa u otra 