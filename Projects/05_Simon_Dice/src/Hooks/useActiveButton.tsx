import { useState, useEffect } from 'react'
import type {colors} from '../types_&_enums.tsx'


export const useActiveButton = () => {

const [activeColor, setActiveColor] = useState<colors | null>(null) // indica el color del boton activo

  // funcion para "encender" un boton 
  // funcion que se le pasa a la maquina para reproducir la secuencia y al jugador cuando hace click en un boton
  const activateButton = (color: colors | null) => {

    setActiveColor(color ? color : null)
    // cambia el estado con un operador ternario dentro de la función (activeColor)
  };

  // -------------- Efecto: brillo de los boton (temporizador) -----------------

  useEffect(
    () => {
      if (activeColor === null) return

      // el temporizador apaga el boton (cambia el estado activeColor a null despues de 250 milisegundos)
      const timer = setTimeout(
        () => activateButton(null),
        250
      );
      //cleanup
      return () => {
        clearTimeout(timer)
      }

    },
    [activeColor]
  );

  return { activeColor, activateButton }
}