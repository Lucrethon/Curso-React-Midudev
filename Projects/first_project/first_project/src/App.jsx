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



export function App () { // Este componente lo tenemos que EXPORTAR para poder usarlo en otro archivo
  return (
    <article>
      <header>
        <img alt="Avatar" src="https://api.dicebear.com/10.x/lorelei/svg?seed=Felix"></img>
        <div>
          <strong>Super Lulu</strong>
          <span>@super_lulu</span>
        </div>
      </header>

      <aside>
        <button>Follow</button>
      </aside>

    </article>
  );
};


// Componente Strong: 

// El componente <strong> en HTML es una etiqueta semántica que se utiliza para indicar que un texto tiene una gran importancia, seriedad o urgencia.

// Por defecto, los navegadores web renderizan el texto dentro de <strong> en negrita, pero su verdadero valor no es estético, sino el significado que le da al contenido. Se usa para: 

// Alertar al usuario
// Destacar términos críticos.

// Componente Span: es un elemento genérico y sin ningún significado semántico. Su única función es servir como un contenedor de línea (inline)

// Componente Aside: El componente <aside> en HTML es otra etiqueta semántica que se utiliza para envolver contenido que está tangencialmente relacionado con el contenido principal que lo rodea, pero que perfectamente podría separarse de este.
// equivale a las típicas barras laterales de una página web