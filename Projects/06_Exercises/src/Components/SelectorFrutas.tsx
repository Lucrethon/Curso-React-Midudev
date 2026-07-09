import { useState } from 'react'

// Ejercicio 4: El Selector Múltiple (Inmutabilidad con .map)
// En el ejercicio anterior eliminaste un elemento con .filter(). Ahora el reto es actualizar un solo elemento dentro de un array sin modificar los demás y sin mutar el estado original.

// El Reto:
// Crea un componente llamado <SelectorFrutas/>.
// Inicia con con un estado complejo: un array de objetos. Los objetos va a tener la siguiente estructura: 
// { id: 1, nombre: "Manzana", seleccionada: false },
// Renderiza la lista usando .map(). Cada elemento debe ser un botón.
// Si la propiedad seleccionada es true, el botón debe tener una clase CSS (o estilo) que lo resalte.

// La trampa: Crea una función toggleFruta(idTarget). Al hacer click en una fruta, esta función debe cambiar el estado seleccionada de false a true (o viceversa). 
// Debes usar .map() para generar un nuevo array donde solo el objeto clickeado se modifique (pista: vas a necesitar el operador spread ... para copiar el objeto antes de cambiarle el valor).

type Frutas = "uva" | "pera" | "manzana" | "cambur" | "guayaba" | "parchita" | "piña" | "melon" | "lechosa" | "fresa" | "níspero"| "guanabana" | "patilla"

type FrutaObject = {
  id: number
  name: Frutas
  isSelected: boolean
}



export const SelectorFrutas = () => {

    const [frutas, setFrutas] = useState<FrutaObject[]>(
    [
    { id: 1, name: "manzana", isSelected: false },
    { id: 2, name: "fresa", isSelected: false },
    { id: 3, name: "patilla", isSelected: false }
    ]
  )

  const taggleFruta = (idTarget: number) => {
  // función para cambiar de estado isSelected al objeto fruto de false a true o viceversa sin modificar el estado original
  const copiaFrutas = frutas.map(
    (fruta: FrutaObject) => {
      if (fruta.id === idTarget) {
        return {...fruta, isSelected: !fruta.isSelected}
      }
      else return fruta
    }
  )

  setFrutas(copiaFrutas)

};

  return frutas.map(
    (fruta: FrutaObject) => {
      const selectedClass = fruta.isSelected ? "selected" : ""
      return (
        <ul>
          <li className={`fruta ${selectedClass}`} key={fruta.id}>
              {fruta.name}
              <button onClick={() => taggleFruta(fruta.id)}>
                {fruta.isSelected ? "✓" : "Seleccionar"}
              </button>
          </li>
        </ul>
      )
    }
  )
};