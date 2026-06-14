import { useState, useEffect } from 'react'

import './App.css'

// Proyecto para seguir el puntero 


function App() {

    const [enabled, setEnabled] = useState(false) // puntero habilitado (inicialmente falso)
    const [position, setPosition] = useState({x: 0, y: 0}) // posicion del puntero (inicialmente cero)


// -------------- useEffect ---------------
// NINGUN HOOK DEBE ESTAR DENTRO DE UN CONDICIONAL, FOR, WHILE, ETC

// Hacer que se ejecute un evento cada vez que cambia el enabled

    useEffect(()=> {
        console.log('efecto', enabled)

        const handleEvent = (event: MouseEvent) => {
            const {clientX, clientY} = event // destructuramos las propiedades de event. es lo mismo que event.clientX, clientY
            console.log({clientX, clientY})
            setPosition({x: clientX, y: clientY}) // se actualiza el estado de posición 
            // clientX, clientY = posicion de nuestro puntero en la pantalla

        };
        // si enabled es true, se ejecuta el evento

        if (enabled) {
            window.addEventListener("pointermove", handleEvent)
        };

        // importante eliminarlo una vez cambia el estado usando una función "cleanup" useEffect
        return () => {
            window.removeEventListener("pointermove", handleEvent)
        }; 

        // cada vez que se actualiza un estado, se renderiza nuevamente todo el componente (App)
        // por ende, el useEffect tambien se ejecuta nuevamente con cada nueva renderizacion
        // cuando se renderiza nuevamente, las funciones declarada dentro del componente React se destruyen y se vuelven a crear desde cero. Pierde su "identidad" anterior.
        // para eliminar un EventListener (o cualquier suscripcio), hay que pasarle exactamente la misma referencia de la función que usada anteriormente para crearlo.
        // para eso se crea una funcion "cleanup": React garantiza que esa limpieza se ejecute antes de que el componente cambie o se destruya, reteniendo "viva" la referencia exacta de la función que se acaba de usar.

        // el cleanunp se ejecuta cada vez que se retira el componente de la pantalla o dependiendo de las dependencias, en este caso, enabled
        // si no se hace el cleanup, se crean eventos de forma exponencial

        // formas de saber cuantas veces se ha suscrito un evento: 
        //getEventListener(window) <- esta funcion se escribe en consola 

    },
        [enabled]
    );

// el useEffect tambien se puede combinar con APIs de terceros para captar eventos
// hacer un windos.addEventListener fuera del efecto no tiene sentido ya que se ejecuta cada vez que se renderiza un componente, cuando solo se tiene que ejecutar una vez
// con el useEffect, decidimos cuando ejecutamos un evento 

// -----------

    // const changeState = (state: boolean) => state ? state = false : state = true 
    // forma de resumir esto: !state (hace exactamente lo mismo que la linea de arriba)
    

    return (
        <main>

        {enabled && (
        <div 
        className="followMouse"
        style={{transform: `translate(${position.x}px, ${position.y}px)`}}>
        </div>
        )}


        <h1>New Project</h1>
        <button onClick={()=> setEnabled(!enabled)}>
            {enabled ? "Desactivar Puntero" : "Activar Puntero"}
        </button>
        </main>
    )

}
export default App
