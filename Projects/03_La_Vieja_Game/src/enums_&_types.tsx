// -------------------------- ENUMS-----------------------------

export const TURNS = {
  X: "×",
  O: "○",
} as const;


export const WINNER = {
  isTie: false,
} as const;


export const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]; 

// -------------------------- TYPES -----------------------------



export type TurnState = '×' | '○'
export type WinnerState = TurnState | false | null