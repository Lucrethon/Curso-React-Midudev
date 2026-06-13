import { useState } from 'react'
import './App.css'
import './index.css'
import confetti from 'canvas-confetti';
import {Square} from './components/Square.tsx'
import {WinnerModal} from './components/WinnerModal.tsx'
import { TURNS } from './enums_&_types.tsx'
import type { TurnState, WinnerState } from './enums_&_types.tsx'
import { checkWinner } from './logic/utils.tsx'





function App() {

  // ------------------------------- ESTADOS ---------------------------------------

  // ---------------- estado tablero: posiciones con un array de 9 ---------------------

const [board, setBoard] = useState(Array(9).fill(null)); // los valores iniciales son null

// ---------------- estado: turnos ----------------------

const [turn, setTurn] = useState<TurnState>(TURNS.X); // el estado inicial es x (turno de x)

// --------------- Estado: ganador ----------------- 

const [winner, setWinner ] = useState<WinnerState>(null) // el estado inicial es null (onGoing game)


// [NOTA-1] Manejo de estados iniciales en React con TS (Ver final del archivo)


// -------------------------------- FUNCIONES --------------------------------------

// ----------- FUNCIÓN para cambiar el estado del turno -------------

const updateBoard = (boardToCheck: (null | string)[], index: number) => {

  // ------------- evitar que los valores se sobrescriban -------------

  if (boardToCheck[index] || winner) { 
    return;
    //si board en el indice indicado existe (no es null) o si hay un ganador (no es null), cortar la función y se para el juego
  }

  // ----------- actualizar el tablero ----------

  const newBoard = [...boardToCheck];
  // se hace una copia del board. [NOTA-2] Inmutabilidad de los estados en React (Ver final del archivo)

  newBoard[index] = turn; // "x" u "o"
  setBoard(newBoard); // funcion para cambiar el estado del tablero. Se le pasa el array actualizado con los cambioss
  
// ------------- actualizar el turno ----------------

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn); // funcion para cambiar de un turno a otro

  // ------------------ revisar si hay ganador -----------------

  const isWinner = checkWinner(newBoard);
  // [NOTA-3] Asincronía en la actualización de estados en React (Ver final del archivo)

    // Si el juego sigue en curso (osea, isWinner no es null)
   // Si isWinner tiene un valor (es "x", "o" o "nobody"), actualizamos el estado

  if (isWinner !== null) {
    setWinner(isWinner); 
    if (isWinner) {confetti();}
    
  }
};

// --------------------- FUNCIÓN para resetear el juego --------------------

function resetGame () {
  setBoard(Array(9).fill(null));
  setTurn(TURNS.X);
  setWinner(null);
}; 

// ----------------- FUNCIÓN para renderizar los square por cada elemento de board ------------------

function displayBoard(boardToCheck: (null | string)[]) {

    return boardToCheck.map((square, index) => {
      return (
        <Square 
        key={index}
        updateBoard={() => updateBoard(boardToCheck, index)}
        >
          {square}
        </Square>
      )
    })
// square representa el valor actual de esa posición en el tablero (por ejemplo: "X", "O", o null si está vacío
// [NOTA-4] Llamadas a funciones en eventos (onClick) (Ver final del archivo)
}; 



// -------------------- App ------------------------

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <section className='game'>
        {displayBoard(board)}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
      
    {
      winner != null && (WinnerModal({winner, resetGame}))
    }
    </main>
  )

}
export default App

// ============================================================================
// ========================= APÉNDICE EXPLICATIVO =============================
// ============================================================================

// ---------------- [NOTA-1] Manejo de estados iniciales en React con TS ------
// En React con TS, cuando asignas un estado inicial al useState, TS infiere que el estado va a ser del mismo type del estado inicial.
// Para arreglar esto, se necesita decirle explicitamente a useState qué type va a ser el estado.
// En TypeScript, los hooks de React como useState aceptan lo que se conoce como un tipo genérico utilizando la sintaxis < >. Si no se lo pasas, TypeScript infiere el tipo basándose únicamente en el valor inicial.


// ---------------- [NOTA-2] Inmutabilidad de los estados en React ------------
// Nunca hay que alterar las props o estados originales directamente.
// Siempre se tiene que crear un array/objeto NUEVO con las modificaciones.
// Las consecuencias de mutar directamente es que pueden haber problemas de renderizado.
// Es importante que los datos del nuevo renderizado siempre sean referencias nuevas en memoria.


// ---------------- [NOTA-3] Asincronía en la actualización de estados --------
// La actualización de estados (como setWinner o setBoard) en React es ASÍNCRONA. 
// Esto quiere decir que NO BLOQUEA EL CÓDIGO QUE VIENE DESPUÉS.
// NO puedes contar con que en la línea siguiente vas a tener el valor actualizado del state, el código que sigue puede trabajar con el valor anterior.

// Por ejemplo: Si pones un alert() después de setWinner, aparece el alert antes de que se actualice la pantalla visualmente con el último movimiento.
// 
// Si a checkWinner() le pasáramos el 'board' original (del estado) en lugar de 'newBoard', como el estado es asíncrono, todavía NO tendría la respuesta actual, lo que nos dejaría hacer una jugada extra.
// Por eso a checkWinner le pasamos una COPIA del board ya modificada (newBoard), para garantizar que evalúa los datos más recientes.
// 
// Alternativas para trabajar con el estado más reciente:
// 1. Pasar una copia manual del estado (lo que hicimos con newBoard).
// 2. Usar una función callback dentro del setState: setBoard(prevBoard => ...).
// Nota: No podemos usar async/await con useState porque no devuelve una promesa.


// ---------------- [NOTA-4] Llamadas a funciones en eventos (onClick) --------
// En el onClick de <Square>, no podemos pasar la ejecución de la función directamente (ej. updateBoard()) porque se estaría ejecutando de inmediato cada vez que el .map() renderiza un elemento.
// Queremos ejecutarla CUANDO el usuario haga click.
// Para eso, tenemos que llamar a la función usando una función flecha anónima: () => updateBoard(boardToCheck, index)
// De esta manera, <Square> recibe una función que se ejecutará solo en el futuro, cuando se haga el click, recordando los parámetros gracias al closure.

