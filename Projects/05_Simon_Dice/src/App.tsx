import { useState, useEffect } from 'react'
import { TURNS, COLORS } from './types_&_enums.tsx'
import {Square} from './components/Square.tsx'
import {Button} from './components/Button.tsx'
import type {colors, turns} from './types_&_enums.tsx'
import { setRandomSecuency, getRandomIndices } from './utils.tsx'

// Hooks 
import { useActiveButton} from './Hooks/useActiveButton.tsx'

import './App.css'
import './index.css'

// Juego "Simon Dice"

const colors = Object.values(COLORS) as colors[]

// -----------------------------------------


function App() {

  const { activeColor, activateButton } = useActiveButton()

  // ------------------ Estados --------------

  const [turn, setTurn] = useState<turns | null>(null);

  const [secuency, setSecuency] = useState<colors[]>(setRandomSecuency(colors, getRandomIndices(colors, 3)));

  const [round, setRound] = useState(0);

  const [userIndex, setUserIndex] = useState(0)

  const [itBegin, setItBegin] = useState(false)

  const [countdown, setcountdown] = useState(3) // cuenta regresiva

  const [gameOver, setGameOver] = useState<null | boolean>(null)

  const [message, setMessage] = useState("")



  // ---------------- Comenzar juego -----------------

  const startGame = () => {
  setSecuency(setRandomSecuency(colors, getRandomIndices(colors, 3))); // crear nueva secuencia 
  setcountdown(3); // reiniciar cronometro de cuenta atras
  setUserIndex(0); // reiniciar clicks
  setItBegin(true); // arrancar el juego
  setGameOver(false);
  };

  // ---------- Efecto: cuenta regresiva en pantalla ----------

  useEffect(() => {
    if (!itBegin) return;

    if (countdown === 0) {
    setTimeout(() => {
      setTurn(TURNS.machine);
      setRound(1);
      }, 0); // <--- Tiempo cero
    return;
    // por que setTimeout de 0 segundos no genera errores de cascading renders?
    // JavaScript saca esa ejecución del flujo principal síncrono y la manda a la "cola de tareas" (Task Queue). React termina de procesar el renderizado actual del contador en 0, limpia el efecto, y en el milisegundo inmediatamente posterior, ejecuta los cambios de turno y ronda sin pisarse los talones.
    }

    const timer = setTimeout(() => {
      setcountdown(countdown - 1);
    },
  1000)
        //cleanup
      return () => {
        clearTimeout(timer)};
  
  }
    , [itBegin, countdown])



  // --------------- Reset Game ---------------

  const resetGame = () => {
  setItBegin(false);
  setGameOver(true);
  setTurn(null);
  setRound(0);
  };


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

  // ---------------- Efecto: reproducir secuencia y agregar colores en cada turno a la secuencia -----------

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

  const handleUserClick = (color: colors) => {

    // activar el brillo del boton que el usuario presione 
    activateButton(color); 

    if (!itBegin) return // si el juego no ha empezado, no se ejecuta 
    if (turn === TURNS.machine) return // si es el turno de la maquina, no se ejecuta 

    const currentUserIndex = userIndex;
    
  // si el color que presiona el usuario es igual al color se la secuencia de la maquina en la posicion 0, 
  // el jugador sigue adelante con el turno, y se suma +1 a 0 para que coindica con el indice de la secuencia 
  if (color === secuency[currentUserIndex]) {
    const nextIndex = currentUserIndex + 1; 
    setUserIndex(nextIndex)
    // bloque de victoria
    if (nextIndex === secuency.length) { // aqui se indica que ya gano y completo toda le secuencia 
      setRound(round + 1)
      setUserIndex(0)
      setTurn(TURNS.machine)
      return
    }
  }
  else {resetGame()}

  }

  // ---------- Efecto: mostrar turno del usuario en pantalla ----------

  useEffect(
    ()=> {
      if (round === 0) return
      const timer = setTimeout(
        ()=> {
          if (turn === TURNS.user) {
            setMessage("Tu turno!")
          }
          else {
            setMessage("")
          }
        }, 200
      )

      // cleanout
      return () => {
        clearTimeout(timer)
      };

    }, [turn]
  )

  // ----------- Button Message ----------------

  const buttonMessage = () => {
    const mess = gameOver ? "Reiniciar Juego" : "Comenzar Juego"
    return mess
  };


  // ------------------ Countdown Display ----------------

      const displayCountdown = () => {
        if (round > 0) return
        else {
          let message = `${countdown}`
          if (countdown === 0)
            message = "GO!"
          return message
        }
    }
  // ----------------- Botones ------------

  function displayBoard() {

    return colors.map((color: colors) => {
        return (
        <Square
        key={color}
        color={color}
        isPressed={activeColor === color ? true : false}
        buttonSelected={() => handleUserClick(color)}
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
    {!itBegin && (
      <Button func={startGame}>
        {buttonMessage()}
      </Button>
    )}
    {/* Sección de información de la partida (Solo aparece si el juego inició) */}
    {itBegin && (
      <section className="game-info">
        <div className="turns">
          {message}
        </div>
        <div className='rounds'>
          {`RONDA: ${round}`}
        </div>
        <div className='countdown'>
          {displayCountdown()}
        </div>
      </section>
    )}

    {gameOver === true && (
      <section>
        <div className='final-message'>
          {`Ops! ¿Quieres volverlo a intentar?`}
        </div>
      </section>

    )}
  </main>
    
  )
}


export default App
