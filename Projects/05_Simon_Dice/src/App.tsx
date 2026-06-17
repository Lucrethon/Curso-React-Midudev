import React, { useState, useEffect, JSX } from 'react'
import './App.css'
import './index.css'

// Juego "Simon Dice"
type colors = "yellow" | "blue" | "red" | "green"
type turns = "machine" | "user"

const TURNS = {
  machine: "machine",
  user: "user",
} as const;

const COLORS = {
  yellow: "yellow",
  blue: "blue", 
  red: "red",
  green: "green"
} as const;

const colors = Object.values(COLORS) as colors[]


const Square = (
  {isPressed, buttonSelected, color} : 
  {isPressed?: boolean, buttonSelected?: () => void, color: colors}) => {

    const className = `square ${color} ${(isPressed ? "is-selected" : "")}`.trim();
    const handleClick = () => {buttonSelected()}

    return (
      <div className={className} onClick={handleClick}></div>
    )
  };



const setRandomSecuency  = (colorsArray: colors[], indices: number[]) => {
    return indices.map(index => colorsArray[index]);
    // funcion que recibe dos array: el de colores y el de numeros de indices random 
    // la funcion dice: por cada numero dentro del array de indices, vas a transformarlo en el objeto que corresponde ese numero al indice en el array de colores y generas un nuevo array
    // esto se hace porque el lintern NO admite utilizar funciones "impuras" (que son cambiantes como random) en una funcion 
    // estps se tienen que pasar como parametro
};

const getRandomIndices = (numberIndices: number) => {
  const indices = Array.from({length: numberIndices}, () => Math.floor(Math.random() * colors.length))
  return indices
}

// -----------------------------------------


function App() {

  const [turn, setTurn] = useState<turns>(TURNS.machine);
  const [secuency, setSecuency] = useState<colors[]>(setRandomSecuency(colors, getRandomIndices(3)));
  const [round, setRound] = useState(1);
  const [activeColor, setActiveColor] = useState<colors | null>(null)

  // "encender" un boton 
  const activeButton = (color: colors | null) => {
    setActiveColor(color ? color : null) 
    // cambia el estado con un operador ternario dentro de la función (activeColor)
  };

  // temporizador para brillo del boton 

  useEffect(
    () => {
      if (activeColor === null) return

      // el temporizador apaga el boton (cambia el estado a null despues de 250 milisegundos)
      const timer = setTimeout(
        () => activeButton(null),
        250
      );
      //cleanup
      return () => {
        clearTimeout(timer)
      }

    },
    [activeColor]
  );

  // useEffect(
  //   ()=> {

  //     if (turn === TURNS.user) return

  //     // Si no es el primer turno, agrega un elemento a la secuencia y la guarda.
  //     if (round != 1) {
  //       const newSecuency = [...secuency]
  //       const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //       newSecuency.push(randomColor);
  //       setSecuency(newSecuency);
  //     }
      
  //     // maneja el temporizador cuando turn = machine (cuando es el turno de la maquina) de cuando tiempo presionara el boton para reproducir la secuencia
  //     // temporizador 
  //     secuency.forEach(function(color) {
  //     const timerId = setTimeout()
  //     })


  //   },
  //   [turn]
  
  // )






  function displayBoard() {

    return colors.map((color: colors) => {
        return (
        <Square
        key={color}
        color={color}
        isPressed={activeColor === color ? true : false}
        buttonSelected={() => activeButton(color)}
        >
        </Square>)
    })
  }


  return (
    <main className="board">
      <h1>Simon Dice</h1>

        <section className='game'>
        {displayBoard()}
      </section>
    </main>
    
  )
}


export default App
