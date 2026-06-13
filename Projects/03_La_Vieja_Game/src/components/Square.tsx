import React from 'react'
import '../index.css'

// -------------------- Componente Square: posiciones en el tablero ----------------

export const Square = (
  { children, isSelected = false, updateBoard }: 

  { children: React.ReactNode, 
    isSelected?: boolean, 
    updateBoard?: () => void }) => {

  const className = `square ${(isSelected ? "is-selected" : "")}`.trim();

  const handleClick = () => {
    if (updateBoard) {
      updateBoard();
    }; 

    // la funcion handleClik valida que si la funcion updateBoard existe, se ejecuta
    // eso es lo que se le pasa al Square

    };
  
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )

  // Cada vez que se le hace click a un Square, se ejecuta la funcion updateBoard (pasada por la validación necesaria de TS por handleClick)

}; 


// -------------- Tipado de children en TS ------------

// En TS, la manera correcta y más segura de tipar childrens en React es children: React.ReactNode.

// ------------- Destructuración -------------------

// Se debe desestructurar la propiedad children (usando llaves {} y en minúscula, que es el nombre reservado de React para los elementos internos) del objeto de propiedades (props).

// "desestructurar" significa extraer valores de un objeto (o de un arreglo) y asignarlos a variables individuales de una forma directa y resumida.

// Cuando React lee {board[index]}, dice: "El desarrollador metió {board[index]} entre las etiquetas de apertura y cierre de <Square>. Voy a crear un objeto de propiedades (props) y voy a guardar ese valor en una propiedad especial llamada children".

// Por detrás, el objeto que React le está enviando a tu componente Square se ve literalmente así:
// { children: "x" }

// Como React va a mandar literalmente un objeto { children: "x" }, se usa la desestructuración en los parámetros de los componente para atrapar solo el valor que importa de forma directa y resumida:

// // Al usar { children }, se extrae directamente la "x" o la "o" del objeto props

// ---------------------------------------------------------