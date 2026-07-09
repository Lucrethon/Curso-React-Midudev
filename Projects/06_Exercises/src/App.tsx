
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



// Ejercicio 2
import { Buttons } from './Components/Buttons'
import { useActivePage } from './Hooks/useActivePage'

// ejericio 3
import { ListaTareas } from './Components/ListaTareas'
import { useTareas } from './Hooks/useTareas'

// ejercicio 4
import { SelectorFrutas } from './Components/SelectorFrutas'

// ejercicio 5 
import { CarruselEmoji } from './Components/CarruselEmojis'

// Ejercicio 6
import { Sprite } from './Components/Sprite'


function App() {

  // ejercicio 2
  const { activePage, handleUserClick, indexes } = useActivePage()
  // ejercicio 3
  const { tareas, eliminarTarea } = useTareas()

  
  return (
  <>
    <div className="App">
      <h1>Ejercicio 2: Manejo de Arrays</h1>
      <div className="buttons-container">
        {Buttons(indexes, handleUserClick, activePage)}
      </div>

      <div className="lista-tareas">
        <h1>Ejercicio 3: Lista de tareas</h1>
        <ul>
          {ListaTareas(tareas, eliminarTarea)}
        </ul>
      </div>
      
      <div>
        <h1>Ejercicio 4: Seleccionador Frutas</h1>
        <SelectorFrutas />
      </div>

      <div>
        <h1>Ejercicio 5: Carrusel de Emojis</h1>
        <CarruselEmoji />
      </div>

      <div>
        <h1>Ejercicio 6: Srpite</h1>
        <Sprite />
      </div>
    </div>
  </>
  )
}

export default App
