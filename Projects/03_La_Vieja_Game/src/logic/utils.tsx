import { WINNER, WINNER_COMBOS } from '../enums_&_types.tsx'
import type { WinnerState } from '../enums_&_types.tsx'


// ------------------ FUNCIÓN para definir ganador -----------------

export const checkWinner = (boardToCheck: (null | string)[]): WinnerState => {

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

  };