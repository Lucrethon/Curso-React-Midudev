import { useState } from 'react'

// Ejercicio 3: El Gestor de Tareas Inmutable (React + .map + .filter con índices)
// En React, nunca debemos modificar un array original (mutación), sino crear copias. Eliminar un elemento de un array basándonos únicamente en su índice numérico es una de las fallas más comunes al aprender.

// El Reto:
// 1. Crea un pequeño componente <ListaTareas />.
// 2. Inicia con un estado: const [tareas, setTareas] = useState(["Estudiar React", "Aprender Node", "Practicar CSS"]).
// 3. Renderiza la lista usando .map(). En cada elemento, incluye un botón que diga "Eliminar".
// 4. Crea la función eliminarTarea(indexTarget).

// La trampa: Debes actualizar el estado usando el método .filter(). El filtro debe evaluar los índices para dejar pasar a todas las tareas excepto a la que coincida con el indexTarget que clickeaste.

export const useTareas = () => {

      const [tareas, setTareas] = useState([
        "Comprar el pan",
        "Limpiar la cocina",
        "Cocinar almuerzo", 
      ])


      const eliminarTarea = (indexTarget: number) => {
        const lista = tareas;
        const listaFiltrada = lista.filter((_, currentIndex) => currentIndex !== indexTarget);
        setTareas(listaFiltrada);
      }
    

    return { tareas, eliminarTarea }
}