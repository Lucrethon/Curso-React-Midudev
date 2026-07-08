import { useState, useEffect } from 'react'
import type {turns} from '../types_&_enums.tsx'
import {TURNS} from '../types_&_enums.tsx'

export const useTurnMessage = ({ turn, round }: {turn: turns | null, round: number}) => {
    
    const [turnMessage, setTurnMessage] = useState("");

      // ---------- Efecto: mostrar turno del usuario en pantalla ----------

  useEffect(
    ()=> {
      if (round === 0) return
      const timer = setTimeout(
        ()=> {
          if (turn === TURNS.user) {
            setTurnMessage("Tu turno!")
          }
          else {
            setTurnMessage("")
          }
        }, 200
      )

      // cleanout
      return () => {
        clearTimeout(timer)
      };

    }, [turn, round]
  )


    return { turnMessage }
}