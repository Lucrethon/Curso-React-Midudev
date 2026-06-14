import { useState, useEffect } from 'react'
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

  // los useStates NO pueden estar nunca dentro de un if, while, for. etc
  // parse -> para convertir texto JSON a codigo 


const [board, setBoard] = useState(
  () => {const boardFromStorage = window.localStorage.getItem("board"); 
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)}
  )

  // si hay movimientos guardados en el localStorage, esos seran los estados iniciales
  // de lo contrario, los valores iniciales son null

  // por que se coloca el getItem dentro del useState??
  // porque sino, cada vez que se rendeirza el tablero, se esta leyendo el localStorage cuando no se necesita y eso es MUY LENTO
  // inicializar el estado solo ocurre una ves

// ---------------- estado: turnos ----------------------

const [turn, setTurn] = useState<TurnState>(
  () => {const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage as TurnState : TURNS.X
  }); 
  
  // si hay un turno guardado en el localStorage, el estado inicial es ese turno
  // de lo contrario, el estado inicial es x (turno de x)

  // Dado que el turno ya es unstring, no hace falta transformarlo con JSON. 
  // Solo le indicamos a TypeScript que asuma ese valor leído como un TurnState.

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

  newBoard[index] = turn; // "x" u "o". Se recupera el indice 
  setBoard(newBoard); // funcion para cambiar el estado del tablero. Se le pasa el array actualizado con los cambioss
  
// ------------- actualizar el turno ----------------

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn); // funcion para cambiar de un turno a otro

  // -------------------- Guardar partida -------------
  // si hay una partida a medias y se actualiza la pagina, no se quiere que los cambios se borren
  // se guarde siempre el ultimo movimiendo 
  // localStorage [NOTA-5]

  window.localStorage.setItem("board", JSON.stringify(newBoard)) // guardar tablero para saber el ultimo movimiento
  window.localStorage.setItem("turn", newTurn) // guardar el NUEVO turno, no el actual

// como el turno ya es un string, no hace falta la funcion stringify

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

  // ---------- Aprendiendo hook useEfect -----------------

  // SOLO puede estar en el cuerto de una funcion de compotente JSX

  useEffect(
    () => {console.log("esto se ejecuta cada vez que se renderiza el componente")}
  ) 
  // si esto no tiene dependencias, se ejecuta cada vez que la app renderiza 
  // al jugar, constantemente se esta cambiando el estado, y al cambiar el estado, se renderiza otra vez el componente 

  useEffect (() => console.log("esto se ejecuta solo al iniciar"), [])
  useEffect (() => console.log("esto se ejecuta cuando cambia el winner"), [winner])


// --------------------- FUNCIÓN para resetear el juego --------------------

// regresa todo a sus estados iniciales

function resetGame () {
  setBoard(Array(9).fill(null));
  setTurn(TURNS.X);
  setWinner(null);

  window.localStorage.removeItem("board") // si hay valores en localStorage, los borra 
  window.localStorage.removeItem("turn") // si hay valores en localStorage, los borra 

  //window.localStorage.clear() // no es buena practica usar el.clear del localStorage porque se pueden borrar cosas que uno no quiere que se borren 
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


// ---------------- [NOTA-5] localStorage -----------------------

// window.localStorage es una propiedad de JavaScript que te permite almacenar datos de forma local en el navegador del usuario.

// los datos persistirán incluso si el usuario cierra el navegador, apaga la computadora o recarga la página. 
// No tienen una fecha de expiración, a menos que se borren explícitamente mediante código o que el usuario limpie el caché de su navegador.

// todo lo que guardes en él se convierte automáticamente en una cadena de texto (string). Si se intenta guardar un objeto directamente, se romperá. 
// Para guardar: Conviértelo a texto con JSON.stringify().
// Para leer: Conviértelo de vuelta a objeto con JSON.parse().

// metodos (como usarlo): 

// Guardar datos (setItem): localStorage.setItem('usuario', 'Carlos');
// Leer datos (getItem): const nombre = localStorage.getItem('usuario'); console.log(nombre); // Imprime: Carlos
// Eliminar un elemento específico (removeItem): localStorage.removeItem('idioma'); // Borra solo la clave 'idioma'
// Limpiar todo (clear): localStorage.clear(); // Borra absolutamente todo lo guardado por tu web

// es util para guardar cosas como: 
// tema visual (modo oscuro/claro)
// carritos de compra temporales 
// preferencias del usuario

// NUNCA guardar información sensible (como contraseñas, tokens de sesión críticos o tarjetas de crédito) en localStorage. Cualquier script malicioso que logre ejecutarse en tu página (ataques XSS) podría leer esos datos fácilmente.
