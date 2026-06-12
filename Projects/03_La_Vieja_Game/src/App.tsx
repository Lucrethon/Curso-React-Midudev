import { use, useState } from 'react'
import './App.css'
import './index.css'
import React from 'react'


const TURNS = {
  x: "x",
  o: "o",
};

const WINNER = {
  tie: "nobody won",
};

const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]


// -------------------- Componente Square: posiciones en el tablero ----------------

const Square = (
  { children, isSelected = false, updateBoard }: 
  { children: React.ReactNode, 
    isSelected?: boolean, 
    updateBoard?: () => void }) => {

  const className = `square ${(isSelected ? "is-selected" : "")}`;

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

  // ---------------- estado tablero: posiciones con un array de 9 ---------------------

const [board, setBoard] = useState(Array(9).fill(null)); // los valores iniciales son null

// ---------------- estado: turnos ----------------------

const [turn, setTurn] = useState(TURNS.x); // el turno inicial es de x

// --------------- Estado: ganador -----------------

const [winner, setWinner] = useState(WINNER.tie)

// ------------------ definir ganador -----------------

const checkWinner = (board: (null | string)[]) => {

  for (const combo of WINNER_COMBOS) {

    const [a, b, c] = combo; // capturamos las posciones
    if (
      board[a] && // las comparamos con el tablero
      board[a] === board[b] && 
      board[a] === board[c]) {

      const win = board[a];
      return win;
    }
  }
  
  if (!board.includes(null)) {
    return WINNER.tie}

  // Si no hay ganador ni empate, y el juego sigue en curso
  return null; 
  
  }


// ----------- función para cambiar el estado del turno -------------

const updateBoard = (board: (null | string)[], index: number) => {

  // ------------- evitar que los valores se sobrescriban -------------

  if (board[index]) { //si board en el indice indicado existe (no es null), cortar la función 
    return;
  }

  // ----------- actualizar el tablero ----------

  const newBoard = [...board];
  // se hace una copia del board porque NUNCA hay que alterar las props 
  // siempre se tiene que crear un array NUEVO con las modificaciones 
  // las consecuencias de esto es que pueden haver problemas de renderizado 
  // es importante que los datos del nuevo renderizado siempre sean nuevos 

  newBoard[index] = turn; // "x" u "o"
  setBoard(newBoard); // funcion para cambiar el estado del tablero. Se le pasa el array actualizado con los cambioss
  
// ------------- actualizar el turno ----------------

  const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
  setTurn(newTurn); // funcion para cambiar de un turno a otro

  // ------------------ definir ganador -----------------


  const isWinner = checkWinner(newBoard);

    // Si el juego sigue en curso (osea, isWinner no es null)
   // Si isWinner tiene un valor (es "x", "o" o "nobody won"), actualizamos el estado

  if (isWinner) {
    setWinner(isWinner);
  }
  
};


// --------------------- función para resetear el juego --------------------

function resetGame () {
  setBoard(Array(9).fill(null));
  setTurn(TURNS.x);
}

// ----------------- función para renderizar los square por cada elemento de board ------------------

function displayBoard(board: (null | string)[]) {

    return board.map((___, index) => {
      return (
        <Square 
        key={index}
        updateBoard={() => updateBoard(board, index)}
        >
          {board[index]}
        </Square>
      )
    })
// aqui no podemos pasar la ejecución de la función (updateBoard()) porque se estaria ejecutandp cada vex que se rendericen los elementos de map
// Queremos ejecutarla cuando el usuario haga click
// para eso, tenemos que llamar a la función updateBoard con una función flecha anonima
//De esta manera, <Square> recibe una función que se ejecutará solo en el futuro, cuando el usuario haga click, y que recordará los parámetros board e index.
}; 

// -------------------- App ------------------------

  return (
    <main className="board">
      <section className='game'>
        {displayBoard(board)}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>

      <div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </main>
  )

}

export default App
