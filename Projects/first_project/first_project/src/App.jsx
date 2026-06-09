import { TwitterCard } from './TwitterFollowCard.jsx'

    // ------------ Funciones como props ------------------

      // que pasa si se quiere pasar una función como prop?

    const addAtt = username => `@${username}` // funcioón que agrega el arroba antes del nombre de usuario

    // esto se puede pasar como prop al elemento JSX para que funione internamente 
    // se pasa la función para que se ejecute desde afuera del TwitterCard, no desde adentro
    // ya dentro de TwitterCard se le esta pasando el parametro correcto para que la función pueda ejecutarse 

    // --------------- Pasar props como objetos -----------------

    // No es lo mas recomentado, pero se puede tener un objeto con los valores de las props y pasarselos al componente JSX con el operador rest 
    // Solo es utilizado cuando son muchas props, de resto es mala practica 
    // Ejemplo: 

    const superLulu = {
        formatUsername: addAtt,
        accountName: "super_lulu",
        avatarUrl: "https://api.dicebear.com/10.x/lorelei/svg?seed=Felix",
    }

export function App() {
  return (
    <div className="tw-followCards">
      <TwitterCard {...superLulu}>
          Super Lulu
      </TwitterCard>

{/* el "Super Lulu" es el children: esta siendo envuelto por elementos JSX y HTML. Ese "children" corresponde a la propiedad username (pero se llama children) y dentro de children se puede tener lo que uno quiera: puede ser una cadena de texto o puede ser un elemento HTML*/}

      <TwitterCard 
        formatUsername={addAtt} 
        accountName="midudev" 
        avatarUrl="https://api.dicebear.com/10.x/lorelei/svg?seed=Max" 
        >
          MiduDev
        </TwitterCard>
    </div>
  );
}

// --------------- Parametro vacio ----------------

// a un elemento JSX podemos pasarle un parametro vacío. Este parametro vacío es automaticamente un booleano true 

// Esto se puede usar por ejemplo para el parametro isFollowing que es un bool si se quiere que sea true 

// -------------- Componentes ---------------------

// En React, no debes invocar un componente como si fuera una función normal de JavaScript (es decir, TwitterCard(...)). En su lugar, debes usar la sintaxis de JSX pasando las propiedades como atributos: <TwitterCard username="..." />.

// las propiedades que se le pasan al elementos JSX se le llaman props

// --------------------- React.Fragment ---------------------

// En las versiones modernas de React, ya no es necesario importar React para usar JSX. Por lo tanto, la forma más recomendada y moderna de usar un React.Fragment es utilizar su sintaxis corta: <> para abrir y </> para cerrar.


// ----------------- Diferencia entre COMPONENTE y ELEMENTO -----------------

// Componente en react: es como una fabrita de elementos. Es una función que al ejecutarla devuelve un elemento

// Elemento: es lo que renderiza react (JSX)

// ---------------- Children -----------------
// Cuando usar children: 

// Si necesitas cambiar la interfaz de usuario desde afuera 
// o necesites meter mas cosas alli
// cuando el componente es extensible
// podrías crear un componente dentro de otro componente (no es muy lindo visualmente)
// es un campo libre. Es un componente reutilizable 