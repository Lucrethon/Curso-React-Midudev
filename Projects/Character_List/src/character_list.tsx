import type { Character } from "./character_card"
export const listaPersonajes: Character[] = [
  {
    id: 1,
    name: "Knight",
    image: "https://opengameart.org/sites/default/files/lidia_1.png",
    rol: "Guerrero",
    level: 85,
    isLocked: false,
  },
  {
    id: 2,
    name: "Mage",
    image: "https://opengameart.org/sites/default/files/threeformsPrev.png",
    rol: "Mago",
    level: 92,
    isLocked: false,
  },
  {
    id: 3,
    name: "Rogue",
    image: "https://opengameart.org/sites/default/files/ghost_gif_by_cookiez.gif",
    rol: "Asesino",
    level: 78,
    isLocked: true,
  },
  {
    id: 4,
    name: "Hunter",
    image: "https://opengameart.org/sites/default/files/preview_118.png",
    rol: "Cazador",
    level: 80,
    isLocked: false,
  },
  {
    id: 5,
    name: "Paladin",
    image: "https://opengameart.org/sites/default/files/lpc_goblin_preview.png",
    rol: "Tanque",
    level: 88,
    isLocked: true,
  }
];