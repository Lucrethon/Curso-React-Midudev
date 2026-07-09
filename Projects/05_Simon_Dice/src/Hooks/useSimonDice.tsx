import { useState, useEffect } from 'react'
import { TURNS } from '../types_&_enums.tsx'
import type {colors, turns} from '../types_&_enums.tsx'

// Hooks 
import { useActiveButton} from './useActiveButton.tsx'
import { useTurnMessage } from './useTurnMessage.tsx'
import { useCountdown } from './useCountdown.tsx'
import { useSequence } from './useSequence.tsx'


export const useSimonDice = () => {

      // ------------------ Estados --------------

  const [turn, setTurn] = useState<turns | null>(null);

  const [round, setRound] = useState(0);

  const [userIndex, setUserIndex] = useState(0)

  const [itBegin, setItBegin] = useState(false)

  const [gameOver, setGameOver] = useState<null | boolean>(null)

    // hooks 

  const { activeColor, activateButton } = useActiveButton()
  const { turnMessage } = useTurnMessage({turn, round})
  const { sequence, createNewSequence, addColorToSequence } = useSequence()

  // ---------------- Comenzar juego -----------------

  const startGame = () => {
  createNewSequence()// crear nueva secuencia 
  resetCountdown(); // reiniciar cronometro de cuenta atras
  setUserIndex(0); // reiniciar clicks
  setItBegin(true); // arrancar el juego
  setGameOver(false);
  };

  // --------- Countdown Complete Handler ---------

  const handleCountdownComplete = () => {
  // Aquí usas tus setters con total libertad
  setTurn(TURNS.machine);
  setRound(1);
};

  const { resetCountdown, goMessage } = useCountdown({itBegin, handleCountdownComplete, round})

  // --------------- Reset Game ---------------

  const resetGame = () => {
  setItBegin(false);
  setGameOver(true);
  setTurn(null);
  setRound(0);
  };


  // --------------- Turno maquina -------------------

  const waitTime = 500 // miliseconds

  // activar los botones correspondientes segun la secuencia:

  const displaysequence = (sequenceToCheck: colors[]) => {

    sequenceToCheck.forEach((color, index) => { // index en forEach indica la posición actual
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
            const newsequence = addColorToSequence();
            displaysequence(newsequence);
          }
          // Sino, solamente se reproduce la secuencia
          else {
            displaysequence(sequence);
          }
        },
        delayTime
      
      ); 

      const timer2 = setTimeout(()=>{
        setTurn(TURNS.user)
      }, waitTime * sequence.length + delayTime + 100
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
  if (color === sequence[currentUserIndex]) {
    const nextIndex = currentUserIndex + 1; 
    setUserIndex(nextIndex)
    // bloque de victoria
    if (nextIndex === sequence.length) { // aqui se indica que ya gano y completo toda le secuencia 
      setRound(round + 1)
      setUserIndex(0)
      setTurn(TURNS.machine)
      return
    }
  }
  else {resetGame()}

  }

  // ----------- Button Message ----------------

  const buttonMessage = () => {
    const mess = gameOver ? "Reiniciar Juego" : "Comenzar Juego"
    return mess
  };

    return {
      // estados 
      itBegin,
      round,
      gameOver,
      turnMessage, 
      activeColor,
      // funciones 
      handleUserClick,
      buttonMessage,
      startGame,
      handleCountdownComplete,
      goMessage,

    }
}