import type { Character } from "./character_card"
export const listaPersonajes: Character[] = [
  {
    id: 1,
    name: "Water Bender",
    image: "https://opengameart.org/sites/default/files/lidia_1.png",
    rol: "Knight",
    level: 85,
    isLocked: false,
  },
  {
    id: 2,
    name: "Dark Mage",
    image: "https://opengameart.org/sites/default/files/threeformsPrev.png",
    rol: "Mage",
    level: 92,
    isLocked: false,
  },
  {
    id: 3,
    name: "Shadow",
    image: "https://opengameart.org/sites/default/files/ghost_gif_by_cookiez.gif",
    rol: "Rogue",
    level: 78,
    isLocked: true,
  },
  {
    id: 4,
    name: "Red Demon",
    image: "https://opengameart.org/sites/default/files/preview_118.png",
    rol: "Hunter",
    level: 80,
    isLocked: false,
  },
  {
    id: 5,
    name: "Sherk",
    image: "https://opengameart.org/sites/default/files/lpc_goblin_preview.png",
    rol: "Tank",
    level: 88,
    isLocked: true,
  }
];