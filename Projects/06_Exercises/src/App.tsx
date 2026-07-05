import { use, useState } from 'react'
import './App.css'

// Ejercicios para repasar metodos de Arrays con TS y React

// Ejercicio 1: ¿qué pasa si quieres un tablero dinámico donde el tamaño lo decida el usuario? Array.from() es perfecto para esto, ya que te permite crear un array de la nada y mapearlo en el mismo paso.

// Reto: Crea una función pura en TypeScript llamada crearTablero(tamaño).

// 1. Debe recibir un número (por ejemplo, 9 para un tablero de 3x3).
// 2. Debe devolver un array de objetos usando exclusivamente Array.from().
// 3. Cada objeto debe tener esta estructura: { id: numero, estaActivo: booleano }.
// 4. Regla de índices: Si el índice de la casilla es un número par, estaActivo debe ser true. Si es impar, false.


// const crearTablero = (num: number) => {
//   const objectArray = Array.from(
//     {length:num}, 
//     (_, index: number) => {
//       return {
//       id: index, 
//       isActive: index % 2 === 0 // <-- Asignación booleana directa
//     }}
//   )
//   return objectArray
// };

// Ejercicio 2: Tienes una tabla de datos muy larga y necesitas botones en la parte inferior para navegar (Página 1, 2, 3...).

// El Reto:
// 1. Crea un componente de React <Paginacion totalPages={5} />.
// 2. Usando Array.from(), genera la cantidad de botones que dicte la prop totalPages.
// 3. Usa .map() para renderizar los botones en pantalla.
// 4. Crea un estado paginaActual.
// 5. El manejo del índice: Cuando se haga click en un botón, ese botón debe recibir una clase CSS especial (ej. active) comparando el índice del array con el estado actual.

const indexArray = (totalPages: number) => {

    return Array.from(
      {length : totalPages}, 
      (_, index: number) => {
        return (
          index + 1
        )
      }
    )
};



const Buttons = (indexArray: number[], handleClick: (value: number)=> void, activePage: number) => {

  return indexArray.map((value: number, index: number) => {
    //su la pagina activa es igual al valor del boton, le asignamos la clase 'active', de lo contrario, no le asignamos ninguna clase.
    const buttonClass = activePage === value ? 'active' : '';
      return (
        // se le pasao una funcion anonima para que al hacer click en el boton, se ejecute la funcion handleClick con el valor del boton como argumento.
        <button onClick={() => handleClick(value)} className={buttonClass} key={index+1}>{value}</button>
      )
    }
  )
};


// Ejercicio 3: El Gestor de Tareas Inmutable (React + .map + .filter con índices)
// En React, nunca debemos modificar un array original (mutación), sino crear copias. Eliminar un elemento de un array basándonos únicamente en su índice numérico es una de las fallas más comunes al aprender.

// El Reto:
// 1. Crea un pequeño componente <ListaTareas />.
// 2. Inicia con un estado: const [tareas, setTareas] = useState(["Estudiar React", "Aprender Node", "Practicar CSS"]).
// 3. Renderiza la lista usando .map(). En cada elemento, incluye un botón que diga "Eliminar".
// 4. Crea la función eliminarTarea(indexTarget).

// La trampa: Debes actualizar el estado usando el método .filter(). El filtro debe evaluar los índices para dejar pasar a todas las tareas excepto a la que coincida con el indexTarget que clickeaste.

const ListaTareas = (
  listaTareas: string[], 
  eliminarTarea: (index:number)=> void) => 
    {
  return listaTareas.map(
    (value: string, index: number) => {
      return (
        <li className='tarea' key={index+1}>{
          value}
          <button 
          onClick={() => eliminarTarea(index)}>
            Eliminar Tarea
          </button>
        </li>
      )
    }
  )

}

// Ejercicio 4: El Selector Múltiple (Inmutabilidad con .map)
// En el ejercicio anterior eliminaste un elemento con .filter(). Ahora el reto es actualizar un solo elemento dentro de un array sin modificar los demás y sin mutar el estado original.

// El Reto:
// Crea un componente llamado <SelectorFrutas/>.
// Inicia con con un estado complejo: un array de objetos. Los objetos va a tener la siguiente estructura: 
// { id: 1, nombre: "Manzana", seleccionada: false },
// Renderiza la lista usando .map(). Cada elemento debe ser un botón.
// Si la propiedad seleccionada es true, el botón debe tener una clase CSS (o estilo) que lo resalte.

// La trampa: Crea una función toggleFruta(idTarget). Al hacer click en una fruta, esta función debe cambiar el estado seleccionada de false a true (o viceversa). 
// Debes usar .map() para generar un nuevo array donde solo el objeto clickeado se modifique (pista: vas a necesitar el operador spread ... para copiar el objeto antes de cambiarle el valor).

type Frutas = "uva" | "pera" | "manzana" | "cambur" | "guayaba" | "parchita" | "piña" | "melon" | "lechosa" | "fresa" | "níspero"| "guanabana" | "patilla"

type FrutaObject = {
  id: number
  name: Frutas
  isSelected: boolean
}



const SelectorFrutas = () => {

    const [frutas, setFrutas] = useState<FrutaObject[]>(
    [
    { id: 1, name: "manzana", isSelected: false },
    { id: 2, name: "fresa", isSelected: false },
    { id: 3, name: "patilla", isSelected: false }
    ]
  )

  const taggleFruta = (idTarget: number) => {
  // función para cambiar de estado isSelected al objeto fruto de false a true o viceversa sin modificar el estado original
  const copiaFrutas = frutas.map(
    (fruta: FrutaObject) => {
      if (fruta.id === idTarget) {
        return {...fruta, isSelected: !fruta.isSelected}
      }
      else return fruta
    }
  )

  setFrutas(copiaFrutas)

};

  return frutas.map(
    (fruta: FrutaObject) => {
      const selectedClass = fruta.isSelected ? "selected" : ""
      return (
        <ul>
          <li className={`fruta ${selectedClass}`} key={fruta.id}>
              {fruta.name}
              <button onClick={() => taggleFruta(fruta.id)}>
                {fruta.isSelected ? "✓" : "Seleccionar"}
              </button>
          </li>
        </ul>
      )
    }
  )
};

// Ejercicio 5: Carrusel Infinito (Lógica de índices y límites)
// Este es un clásico del desarrollo web. No vas a iterar sobre todo el array a la vez, sino que vas a usar un estado numérico para "apuntar" a un solo elemento del array en un momento dado, y te moverás por él.

// El Reto:
// 1. Crea un componente llamado <CarruselEmojis/>.
// 2. No uses un estado para la lista, solo una constante simple fuera o dentro del componente:
// const emojis = ["🚀", "🎸", "👾", "🦖", "🍔"];

// 3. Crea un estado para controlar dónde estás parado: const [indiceActual, setIndiceActual] = useState(0).
// 4. En la pantalla debe renderizarse en gigante solo el emoji actual (usando emojis[indiceActual]).

// 5. Crea dos botones: "Anterior" y "Siguiente".
// Si estás en el 0 y le dan a "Anterior", debe saltar al último elemento (el 4).

const CarruselEmoji = () => {

  const [currentIndex, setCurrentIndex] = useState<number>(0); 
  const emojis = ["🚀", "🎸", "👾", "🦖", "🍔"];
  

  const next = () => {
    if (currentIndex === emojis.length-1) setCurrentIndex(0)
    else setCurrentIndex(currentIndex + 1)
  };

  const previous = () => {
    if (currentIndex === 0) setCurrentIndex(emojis.length - 1)
      else setCurrentIndex(currentIndex - 1)
  };

  const currentEmoji = emojis[currentIndex];

  return (
    <div>
      <button onClick={previous}>{"<"}</button>
      {currentEmoji}
      <button onClick={next}>{">"}</button>
    </div>
  )
}



function App() {

  // estado ejercicio 2
  const [activePage, setActivePage] = useState<number>(0)
  // estado ejercicio 3
  const [tareas, setTareas] = useState([
    "Comprar el pan",
    "Limpiar la cocina",
    "Cocinar almuerzo", 
  ])

  // ----------- funciones ---------------

  // Ejercicio 2
  const handleUserClick = (index: number) => {
    setActivePage(index)
  }; 
  const indexes = indexArray(5); 

  // Ejercicio 3
  const eliminarTarea = (indexTarget: number) => {
    const lista = tareas;
    const listaFiltrada = lista.filter((_, currentIndex) => currentIndex !== indexTarget);
    setTareas(listaFiltrada);
  }

  
  return (
  <>
    <div className="App">
      <h1>Ejercicios de Arrays</h1>
      <div className="buttons-container">
        {Buttons(indexes, handleUserClick, activePage)}
      </div>
      <div className="lista-tareas">
        <h1>Ejercicio de lista de tareas</h1>
        <ul>
          {ListaTareas(tareas, eliminarTarea)}
        </ul>
      </div>
      <div>
        <h1>Ejercicio de Frutas</h1>
        <SelectorFrutas />
      </div>
      <div>
        <h1>Ejercicio de Carrusel de Emojis</h1>
        <CarruselEmoji />
      </div>
    </div>
  </>
  )
}

export default App
