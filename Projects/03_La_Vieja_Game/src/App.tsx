import { useState } from 'react'
import './App.css'
import './index.css'
import React from 'react'


const turns = {
  x: "x",
  o: "o",
};

const Square = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='square'>
      {children}
    </div>
  )
}

// -------------- Tipado de children en TS ------------

// En TS, la manera correcta y más segura de tipar childrens en React es children: React.ReactNode.

// ------------- Destructuración -------------------

// Se debe desestructurar la propiedad children (usando llaves {} y en minúscula, que es el nombre reservado de React para los elementos internos) del objeto de propiedades (props).

// "desestructurar" significa extraer valores de un objeto (o de un arreglo) y asignarlos a variables individuales de una forma directa y resumida.

function displayBoard(board: (null | string)[]) {

    return board.map((___, index) => {
      return (
        <Square 
        key={index}>
          {board[index]}
        </Square>
      )
    })

}; 

// Cuando React lee {board[index]}, dice: "El desarrollador metió {board[index]} entre las etiquetas de apertura y cierre de <Square>. Voy a crear un objeto de propiedades (props) y voy a guardar ese valor en una propiedad especial llamada children".

// Por detrás, el objeto que React le está enviando a tu componente Square se ve literalmente así:
// { children: "x" }

// Como React va a mandar literalmente un objeto { children: "x" }, se usa la desestructuración en los parámetros de los componente para atrapar solo el valor que importa de forma directa y resumida:

// // Al usar { children }, se extrae directamente la "x" o la "o" del objeto props


function App() {

const [board, setBoard] = useState(["x", "o", "x", "o", "x", "o", "x", "o", "x"]);

  return (
    <main className="board">
      <section className='game'>
        {displayBoard(board)}
      </section>
    </main>
  )

}

export default App
