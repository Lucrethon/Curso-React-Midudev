import { useState } from 'react'

// Ejercicio 2: Tienes una tabla de datos muy larga y necesitas botones en la parte inferior para navegar (Página 1, 2, 3...).

// El Reto:
// 1. Crea un componente de React <Paginacion totalPages={5} />.
// 2. Usando Array.from(), genera la cantidad de botones que dicte la prop totalPages.
// 3. Usa .map() para renderizar los botones en pantalla.
// 4. Crea un estado paginaActual.
// 5. El manejo del índice: Cuando se haga click en un botón, ese botón debe recibir una clase CSS especial (ej. active) comparando el índice del array con el estado actual.

export const useActivePage = () => {

      // estado ejercicio 2
  const [activePage, setActivePage] = useState<number>(0);

    // Ejercicio 2
  const handleUserClick = (index: number) => {
    setActivePage(index)
  }; 

    const indexArray = (totalPages: number) => {

    return Array.from(
      {length : totalPages}, 
      (_, index: number) => {
        return (
          index + 1
        )
      }
    )
};
    const indexes = indexArray(5); 

    return { activePage, handleUserClick, indexes }
}