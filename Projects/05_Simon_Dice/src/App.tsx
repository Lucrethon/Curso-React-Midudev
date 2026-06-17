import React, { useState, useEffect } from 'react'
import type {JSX} from 'react'
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

  // ------------------ Estados --------------

  const [turn, setTurn] = useState<turns | null>(null);
  const [secuency, setSecuency] = useState<colors[]>(setRandomSecuency(colors, getRandomIndices(3)));
  const [round, setRound] = useState(0);
  const [activeColor, setActiveColor] = useState<colors | null>(null)

  // ----------- Color Buttons -------------

  // "encender" un boton 
  // funcion que se le pasa a la maquina para reproducir la secuencia y al jugador cuando hace click en un boton
  const activateButton = (color: colors | null) => {
    setActiveColor(color ? color : null) 
    // cambia el estado con un operador ternario dentro de la función (activeColor)
  };

  // temporizador para brillo del boton 

  useEffect(
    () => {
      if (activeColor === null) return

      // el temporizador apaga el boton (cambia el estado activeColor a null despues de 250 milisegundos)
      const timer = setTimeout(
        () => activateButton(null),
        250
      );
      //cleanup
      return () => {
        clearTimeout(timer)
      }

    },
    [activeColor]
  );

  // ---------------- Comenzar juego -----------------

  const startGame = () => {
    setTurn(TURNS.machine)
    setRound(1)
  };

  // --------------- Reset Game ---------------

  const resetGame = () => {
    setTurn(null)
    setRound(0)
    setSecuency(setRandomSecuency(colors, getRandomIndices(3)))
  }


  // --------------- Turno maquina -------------------

  const waitTime = 500 // miliseconds

   // añadir color a la secuencia:

  const addColorToSecuency = () => {

        // Funcion para agregar un elemento a la secuencia y la guarda.
        const newSecuency = [...secuency]
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        newSecuency.push(randomColor);
        setSecuency(newSecuency);
        return newSecuency;
        
  };

  // activar los botones correspondientes segun la secuencia:

  const displaySecuency = (secuencyToCheck: colors[]) => {

    secuencyToCheck.forEach((color, index) => { // index en forEach indica la posición actual
      setTimeout(() => {
        activateButton(color);
      }, (waitTime * index)); // se multiplica index por el tiempo de espera para no presionar los botones al mismo momento
    
    }
    )
  };


  useEffect(
    ()=> {

      const delayTime = 1000;

      if (turn === TURNS.user) return // si es el turno del usuario, no se ejecuta 
      if (round === 0) return // si el juego no ha empezado, no se ejecuta

      // despues de pasado un segundo, se agrega un color a la secuencia y se reproduce 
      const timer = setTimeout(
        () => {
          // Si no es el primer turno, se agrega un color a la secuencia y se reproduce 
          if (round != 1) {
            const newSecuency = addColorToSecuency();
            displaySecuency(newSecuency);
          }
          // Sino, solamente se reproduce la secuencia
          else {
            displaySecuency(secuency);
          }
        },
        delayTime
      
      ); 

      const timer2 = setTimeout(()=>{
        setTurn(TURNS.user)
      }, waitTime * secuency.length + delayTime + 100
    )

      //cleanup
      return () => {
        clearTimeout(timer)
        clearTimeout(timer2)
      };

    },
    [turn, round]
  
  )

  // ---------------- turno usuario -----------------



  // ----------------- Botones ------------

  function displayBoard() {

    return colors.map((color: colors) => {
        return (
        <Square
        key={color}
        color={color}
        isPressed={activeColor === color ? true : false}
        buttonSelected={() => activateButton(color)}
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
      <section>
        <div className='buttons'>
          <button onClick={startGame}>Comenzar Juego</button>
          <button onClick={resetGame}>Reiniciar Juego</button>
        </div>
      </section>
    </main>
    
  )
}


export default App
