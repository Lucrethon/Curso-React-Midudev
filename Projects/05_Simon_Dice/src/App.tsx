
import { COLORS } from './types_&_enums.tsx'
import {Square} from './components/Square.tsx'
import {Button} from './components/Button.tsx'
import type {colors} from './types_&_enums.tsx'

// Hooks 
import { useSimonDice } from './Hooks/useSimonDice.tsx'

import './App.css'
import './index.css'

// Juego "Simon Dice"

const colors = Object.values(COLORS) as colors[]

// -----------------------------------------


function App() {

    // ------------------ Hooks --------------

  const {
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
      goMessage,
    
    } = useSimonDice()


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
          {turnMessage}
        </div>
        <div className='rounds'>
          {`RONDA: ${round}`}
        </div>
        <div className='countdown'>
          {goMessage()}
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
