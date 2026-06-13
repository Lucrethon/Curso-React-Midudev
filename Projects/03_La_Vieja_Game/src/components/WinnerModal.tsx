
import '../index.css'
import {Square} from './Square.tsx'
import type { WinnerState } from '../enums_&_types.tsx'

// ---------------------- Ventana modal de ganador --------------------------

export const WinnerModal = ({winner, resetGame}: {winner: WinnerState, resetGame: ()=> void}) => {

   // if (winner === null) return null

   const winnerText = winner === false ? "Empate" : `El ganador es:`


    return (
        <section className='winner'>
          <div className='text'>
            <h2>{winnerText}</h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Reset Game</button>
            </footer>
              
          </div>
        </section>
    )
};


// operador && logico: evalúa los valores de izquierda a derecha

// Si el primer valor es falso (false, null, undefined, 0, ""), JavaScript se detiene inmediatamente y devuelve ese valor falso. No sigue leyendo el resto.
// Si el primer valor es verdadero (truthy), JavaScript continúa y devuelve el segundo valor.

// React está diseñado para ignorar y no pintar nada en la pantalla si un elemento devuelve false, null o undefined.

// ------------------ renderizado condicional ------------------------

// Usa && cuando solo te interesa que se muestre algo si la condición es verdadera, y si es falsa no quieres hacer absolutamente nada.
// Usa el ternario (? :) cuando tienes un plan A (si es verdadero) y un plan B (si es falso), como en tu código, donde si es false muestra "Empate" y si no, muestra "El ganador es:".


// ------------------------ ventada modal ---------------------------

// crear una ventana modal en JSX : 

// 1. Abres llaves {} en tu JSX.

// 2. Usas el operador && con tu condición .

// 3. Abres parentesis y metes el JSX (la estructura de tu modal).

// 4. Le aplicas CSS para que flote sobre la pantalla.