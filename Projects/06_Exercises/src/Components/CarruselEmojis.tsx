import { useState } from 'react'


// Ejercicio 5: Carrusel Infinito (Lógica de índices y límites)
// Este es un clásico del desarrollo web. No vas a iterar sobre todo el array a la vez, sino que vas a usar un estado numérico para "apuntar" a un solo elemento del array en un momento dado, y te moverás por él.

// El Reto:
// 1. Crea un componente llamado <CarruselEmojis/>.
// 2. No uses un estado para la lista, solo una constante simple fuera o dentro del componente:
// const emojis = ["🚀", "🎸", "👾", "🦖", "🍔"];

// 3. Crea un estado para controlar dónde estás parado: const [indiceActual, setIndiceActual] = useState(0).
// 4. En la pantalla debe renderizarse en gigante solo el emoji actual (usando emojis[indiceActual]).

// 5. Crea dos botones: "Anterior" y "Siguiente".
// Si estás en el 0 y le dan a "Anterior", debe saltar al último elemento (el 4).

export const CarruselEmoji = () => {

  const [currentIndex, setCurrentIndex] = useState<number>(0); 
  const emojis = ["🚀", "🎸", "👾", "🦖", "🍔"];
  

  const next = () => {
    if (currentIndex === emojis.length-1) setCurrentIndex(0)
    else setCurrentIndex(currentIndex + 1)
  };

  const previous = () => {
    if (currentIndex === 0) setCurrentIndex(emojis.length - 1)
      else setCurrentIndex(currentIndex - 1)
  };

  const currentEmoji = emojis[currentIndex];

  return (
    <div>
      <button onClick={previous}>{"<"}</button>
      {currentEmoji}
      <button onClick={next}>{">"}</button>
    </div>
  )
}
