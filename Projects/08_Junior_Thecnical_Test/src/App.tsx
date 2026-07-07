import {use, useEffect, useState} from 'react'
import './App.css'

// # Prueba técnica para Juniors y Trainees de React en Live Coding

// Recupera un fact aleatorio de gatos de la primera API
// Recupera la primera palabra del fact
// Muestra una imagen de un gato con la primera palabra recuperada

// APIs:

// - Facts Random: https://catfact.ninja/fact 
// - Imagen random: https://cataas.com/cat/says/hello    

const catEndpointRandomFact = "https://catfact.ninja/fact "
// const catEndpointImageUrl = `https://cataas.com/cat/says/${firstWord}?json=true`


const App = () => {

const [fact, setFact] = useState<string>("")
const [error, setError] = useState<string | null>(null)
const [loading, setLoading] = useState<boolean>(true)

useEffect(
    ()=> {
    const getFact = async () => {
    try {
        const res = await fetch(catEndpointRandomFact);
        const fact = await res.json();
        setFact(fact.fact)
        
        // SIN async - await seria asi: 

        // fetch(catEndpointRandomFact)
        // .then(res => res.json())
        // .then(data => setFact(data.fact))


    } catch(err) {
        
        if (err instanceof Error) {
            setError(err.message)
        }
        else if (err instanceof TypeError) {
            setError(err.message)
        }
        else {
            (setError(`${String(Error)}`))
        }
    } finally {
        setLoading(false)
    };
    }
    getFact();
    }, []
)

if (loading) {const message = "Cargando"}


return (
    <>
    <h1>App de Gatos (prueba tecnica)</h1>
    {
        (fact
            ? <p>{fact}</p>
            : <p>{"Loading"}</p>
        )
    }
    </>
    )
}

export default App
