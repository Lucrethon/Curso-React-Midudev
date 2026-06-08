import type { Character } from "./character_card"
export const listaPersonajes: Character[] = [
  {
    id: 1,
    name: "Knight",
    image: "https://placeholder.co/100x100/png?text=Knight",
    rol: "Guerrero",
    level: 85,
    isLocked: false,
  },
  {
    id: 2,
    name: "Mage",
    image: "https://placeholder.co/100x100/png?text=Mage",
    rol: "Mago",
    level: 92,
    isLocked: false,
  },
  {
    id: 3,
    name: "Rogue",
    image: "https://placeholder.co/100x100/png?text=Rogue",
    rol: "Asesino",
    level: 78,
    isLocked: true,
  },
  {
    id: 4,
    name: "Hunter",
    image: "https://placeholder.co/100x100/png?text=Hunter",
    rol: "Cazador",
    level: 80,
    isLocked: false,
  },
  {
    id: 5,
    name: "Paladin",
    image: "https://placeholder.co/100x100/png?text=Paladin",
    rol: "Tanque",
    level: 88,
    isLocked: true,
  }
];