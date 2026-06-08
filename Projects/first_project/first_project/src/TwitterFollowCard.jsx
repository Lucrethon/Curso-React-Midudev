import './App.css'

// Una Twitter Card tiene 4 elementos importantes: 

// 1. Foto de perfil
// 2. Nombre de usuario
// 3. Cuenta
// 4. Boton de seguir

// Ejercicio: Crear una Twitter Card con los 4 elementos mencionados

// Para eso se utilizará el componente Article

// Componente <article> en HTML: es una etiqueta semántica que se utiliza para envolver un contenido que es autónomo, independiente y reutilizable.

// Significa que si quiero tomar ese bloque de contenido y ponerlo en otra página web o en un lector de noticias (RSS), el texto seguiría teniendo sentido por sí mismo. Se utiliza cuando: 

// Artículos de blog o noticias.
// Publicaciones en redes sociales (un tweet, un post de Facebook).
// Comentarios de usuarios (sí, un comentario dentro de un foro o blog puede ser un <article> por sí mismo).
// Tarjetas de producto (product cards) en una tienda en línea.
// Cualquier entrada en un foro de discusión.


// Componente Strong: 

// El componente <strong> en HTML es una etiqueta semántica que se utiliza para indicar que un texto tiene una gran importancia, seriedad o urgencia.

// Por defecto, los navegadores web renderizan el texto dentro de <strong> en negrita, pero su verdadero valor no es estético, sino el significado que le da al contenido. Se usa para: 

// Alertar al usuario
// Destacar términos críticos.

// Componente Span: es un elemento genérico y sin ningún significado semántico. Su única función es servir como un contenedor de línea (inline)

// Componente Aside: El componente <aside> en HTML es otra etiqueta semántica que se utiliza para envolver contenido que está tangencialmente relacionado con el contenido principal que lo rodea, pero que perfectamente podría separarse de este.
// equivale a las típicas barras laterales de una página web


export function TwitterCard ({ username, accountName, avatarUrl }) { // Este componente lo tenemos que EXPORTAR para poder usarlo en otro archivo
    return (
    <article className="tw-followCard">
    <header className='tw-followCard-header'>
        <img 
        alt="Avatar" 
        className="tw-followCard-avatar" 
        src={avatarUrl}>
        </img>
        <div className="tw-followCard-info">
            <strong className="tw-followCard-name">{username}</strong>
            <span className="tw-followCard-username">{accountName}</span>
        </div>
    </header>

    <aside>
        <button className="tw-followCard-followButton">Follow</button>
    </aside>

    </article>
    );
};

// Este componente ya es reutilizable 

// Una buena practica para crear componentes reutilizables es no agregar un margin al estilo original porque hay que considerar que ese componente se puede utilizar de forma aislada en otro lugar 

// La mejor practica es que, cuando lo vayas a utilizar, cargarlo en un div, section, etc, y que ese estilo de separacion sea de la pagina, no del componente 


// Para evitar seleccionar un elemento HTML completo, hay que seleccionar los elementos por clases y hay que crearle a cada elemento su propia clase
// Para eso se utiliza "className" (pascalCase)
// Lo ideal es que se utilicen abreviaciones para que todos los elementos hijos tengan el mismp nombre del padre

// En reac también se puede estilar con CSS modules 
// Pero React no se mete en la forma de estilar tus componentes 
// Hay una pagina llamada Chakra que te da componentes de React ya estilizados 