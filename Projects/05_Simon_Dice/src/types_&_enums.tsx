export type colors = "yellow" | "blue" | "red" | "green"
export type turns = "machine" | "user"

export const TURNS = {
  machine: "machine",
  user: "user",
} as const;

export const COLORS = {
  yellow: "yellow",
  blue: "blue", 
  red: "red",
  green: "green"
} as const;
