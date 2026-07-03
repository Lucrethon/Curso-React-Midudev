import { useState } from 'react'
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



function App() {

  const [activePage, setActivePage] = useState<number>(0)

  const handleUserClick = (index: number) => {
    setActivePage(index)
  }; 

  const indexes = indexArray(5); 
  
  return (
    <div className="App">
      <h1>Ejercicios de Arrays</h1>
      <div className="buttons-container">
        {Buttons(indexes, handleUserClick, activePage)}
      </div>
    </div>
  )
}

export default App
