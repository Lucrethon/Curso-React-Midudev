import { useState } from 'react'
import './App.css'
import './index.css'
import React from 'react'


const TURNS = {
  X: "x",
  O: "o",
} as const;


const WINNER = {
  isTie: false,
} as const;


const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]; 

type WinnerState = 'x' | 'o' | false | null
type TurnState = 'x' | 'o'



// -------------------- Componente Square: posiciones en el tablero ----------------

const Square = (
  { children, isSelected = false, updateBoard }: 

  { children: React.ReactNode, 
    isSelected?: boolean, 
    updateBoard?: () => void }) => {

  const className = `square ${(isSelected ? "is-selected" : "")}`.trim();

  const handleClick = () => {
    if (updateBoard) {
      updateBoard();
    }; 

    // la funcion handleClik valida que si la funcion updateBoard existe, se ejecuta
    // eso es lo que se le pasa al Square

    };
  
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )

  // Cada vez que se le hace click a un Square, se ejecuta la funcion updateBoard (pasada por la validación necesaria de TS por handleClick)

}; 


// -------------- Tipado de children en TS ------------

// En TS, la manera correcta y más segura de tipar childrens en React es children: React.ReactNode.

// ------------- Destructuración -------------------

// Se debe desestructurar la propiedad children (usando llaves {} y en minúscula, que es el nombre reservado de React para los elementos internos) del objeto de propiedades (props).

// "desestructurar" significa extraer valores de un objeto (o de un arreglo) y asignarlos a variables individuales de una forma directa y resumida.

// Cuando React lee {board[index]}, dice: "El desarrollador metió {board[index]} entre las etiquetas de apertura y cierre de <Square>. Voy a crear un objeto de propiedades (props) y voy a guardar ese valor en una propiedad especial llamada children".

// Por detrás, el objeto que React le está enviando a tu componente Square se ve literalmente así:
// { children: "x" }

// Como React va a mandar literalmente un objeto { children: "x" }, se usa la desestructuración en los parámetros de los componente para atrapar solo el valor que importa de forma directa y resumida:

// // Al usar { children }, se extrae directamente la "x" o la "o" del objeto props

// ---------------------------------------------------------


function App() {

  // ------------------------------- ESTADOS ---------------------------------------

  // ---------------- estado tablero: posiciones con un array de 9 ---------------------

const [board, setBoard] = useState(Array(9).fill(null)); // los valores iniciales son null

// ---------------- estado: turnos ----------------------

const [turn, setTurn] = useState<TurnState>(TURNS.X); // el estado inicial es x (turno de x)

// --------------- Estado: ganador ----------------- 

const [winner, setWinner ] = useState<WinnerState>(null) // el estado inicial es null (onGoing game)



// ------------------------- manejo de estados iniciales en React ---------------------

// En Reac con TS, cuando asignas un estado inicial al useState, TS infiere que el estado va a ser del mismo type del estado inicial

// Para arreglar esto, se necesita decirle explicitamente a useState que type va a ser el estado

// En TypeScript, los hooks de React como useState aceptan lo que se conoce como un tipo genérico utilizando la sintaxis < >. Si no se lo pasas, TypeScript infiere el tipo basándose únicamente en el valor inicial


// -------------------------------- FUNCIONES --------------------------------------


// ------------------ funcion para definir ganador -----------------

const checkWinner = (boardToCheck: (null | string)[]): WinnerState => {

  // el parámetro board está definido como (null | string)[]. Al extraer una posición del tablero (const win = board[a]), TypeScript asume que win es un string general.

  for (const combo of WINNER_COMBOS) {

    const [a, b, c] = combo; // capturamos las posciones
    if (
      boardToCheck[a] && // las comparamos con el tablero
      boardToCheck[a] === boardToCheck[b] && 
      boardToCheck[a] === boardToCheck[c]) {

      const win = boardToCheck[a];
      return win as WinnerState;

      // por eso hay que decirle explicitamente a la funcion que no nos va a retornar un string normal, nos va a retornar el type WinnerState
    }
}
  // cuando todas las posiciones son diferentes a null y ninguna de las combinacniones anteriores se dio, es un empate:
  if (!boardToCheck.includes(null)) {return WINNER.isTie as WinnerState} // => false 


    // Si no hay ganador ni empate, y el juego sigue en curso:
    return null

  }






// ----------- función para cambiar el estado del turno -------------

const updateBoard = (boardToCheck: (null | string)[], index: number) => {

  // ------------- evitar que los valores se sobrescriban -------------

  if (boardToCheck[index] || winner) { 
    return;
    //si board en el indice indicado existe (no es null) o si hay un ganador (no es null), cortar la función y se para el juego
  }

  // ----------- actualizar el tablero ----------

  const newBoard = [...boardToCheck];
  // se hace una copia del board porque NUNCA hay que alterar las props 
  // siempre se tiene que crear un array NUEVO con las modificaciones 
  // las consecuencias de esto es que pueden haver problemas de renderizado 
  // es importante que los datos del nuevo renderizado siempre sean nuevos 

  newBoard[index] = turn; // "x" u "o"
  setBoard(newBoard); // funcion para cambiar el estado del tablero. Se le pasa el array actualizado con los cambioss
  
// ------------- actualizar el turno ----------------

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn); // funcion para cambiar de un turno a otro

  // ------------------ revisar si hay ganador -----------------

  const isWinner = checkWinner(newBoard);

  // ------------------ asincronia en react -------------------

  // si aqui le pasaramos el Board original con el estado, 
  // como el estado del tablero es asincrono, nos deja hacer una jugada mas antes de parar
  // porque todavia NO tenia la respuesta actual del estado del tablero sino el anterior estado, pero si siguio ejecutando el codigo 

  // hay dos formas de solucionar esto: 
  // pasar una copia del valor del estado o
  // pasar una funcion callback que devuelva una copia del estado
  // pero no podemos hacer ningun async await porque useState no devuelve una promesa 

  // -----------------------------------------------------------

    // Si el juego sigue en curso (osea, isWinner no es null)
   // Si isWinner tiene un valor (es "x", "o" o "nobody"), actualizamos el estado

  if (isWinner !== null) {
    setWinner(isWinner); 
    // -----------------------------------------------------

    // el setWinner actualiza el estado de forma ASINCRONA 

  // y como anunciamos quien gano? 
  // en teoria, si ponemos un alert despues del setWinner, se muestra 

  // alert(`El ganador es ${isWinner}`)
    // aparece el alert, pero visualmente, se coloca el ultimo movimiendo ganador DESPUES del alert

    // esto quiere decir que la actualizacion de estados en react es ASINCRONO
    // Osea, NO BLOQUEA EL CODIGO QUE VIENE DESPUES
    // el estado se puede actualizar en 4, 7, 10 segundos, pero se ejecuta el codigo que viene despues 
    // NO puedes contar con que vas a tener el valor actualizado de state 
    // el codigo que sigue puede trabajar con el valor anterior del state

    // por eso es que a checkWinner le pasamos una COPIA del board. Si le pasamos el board original (que contiene el estado del board), NO HAY GARANTIA DE QUE TENGA EL ESTADO porque la actualizacion del estado es ASINCRONA

  }
};

// --------------------- función para resetear el juego --------------------

function resetGame () {
  setBoard(Array(9).fill(null));
  setTurn(TURNS.X);
  setWinner(null);
}; 

// ----------------- función para renderizar los square por cada elemento de board ------------------

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

// aqui no podemos pasar la ejecución de la función (updateBoard()) porque se estaria ejecutandp cada vex que se rendericen los elementos de map
// Queremos ejecutarla cuando el usuario haga click
// para eso, tenemos que llamar a la función updateBoard con una función flecha anonima
//De esta manera, <Square> recibe una función que se ejecutará solo en el futuro, cuando el usuario haga click, y que recordará los parámetros board e index.
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
      winner != null && (

        <section className='winner'>
          <div className='text'>
            <h2>
              {
                winner === false 
                ? "Empate"
                : `El ganador es:`
              }

            </h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Reset Game</button>
            </footer>
              
          </div>
        </section>
      )
    }
    </main>
  )

}

export default App

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