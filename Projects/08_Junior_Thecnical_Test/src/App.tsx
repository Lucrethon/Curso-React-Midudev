import {useEffect, useState} from 'react'
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


const CatComponent = () => {

const [fact, setFact] = useState<string>("")
const [imageUrl, setImageUrl] = useState<string>("")
// fact errors & loading
const [factError, setFactError] = useState<string | null>(null)
const [factLoading, setFactLoading] = useState<boolean>(true)
// imageUrl errors & loading
const [imageUrlError, setImageUrlError] = useState<string | null>(null)
const [imageUrlLoading, setImageUrlLoading] = useState<boolean>(true)

// obtener la el dato curioso cada vez que se renderice la pagina
// CON async - await
useEffect(
    ()=> {
    const getFact = async () => {
    try {
        // con async - await
        const res = await fetch(catEndpointRandomFact);
        const data = await res.json();
        const fact = data.fact as string
        setFact(fact)
        
        // SIN async - await seria asi: 

        // fetch(catEndpointRandomFact)
        // .then(res => res.json())
        // .then(data => setFact(data.fact))

    } catch(err) {
        
        if (err instanceof Error) {
            setFactError(err.message)
        }
        else if (err instanceof TypeError) {
            setFactError(err.message)
        }
        else {
            (setFactError(`${String(err)}`))
        }
    } finally {
        setFactLoading(false)
    };
    }
    getFact();
    }, []
);

    // las dependencias vacias hacen que se ejecute una sola vez al montar el componente

    // si el efecto es un condicional del useEffect, ahi se tiene que colocar fact en las dependencias
    // si se pone fact, se ejecutaria cada vez que fact cambie (osea, cada vez que se haga un setFact), y eso generaria un loop infinito

    // si no se coloca ningun array, se genera un loop infinito, porque cada vez que se ejecuta el useEffect, se cambia el estado de fact, y eso hace que se vuelva a ejecutar el useEffect
    // esto puede servir para tracking cambios de estado, pero en este caso no es necesario


// obtener la imagen cada vez que cambie el hecho
// con solamente fetch 
useEffect(
    () => {
        if (!fact) return // si no hay un hecho, no se ejecuta el efecto

        // recuperar la primera palabra del fact 
        const firstWord = fact.split(" ")[0]
        // recuperar las tres primeras palabras del fact
        // const threeWords = fact.split(" ").slice(0, 3).join(" ")

        fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
        .then(res => {
            if (!res.ok) throw new Error("No se ha podido cargar la imagen")
            return res.json()
        })
        .then(picture => setImageUrl(picture.url)
        )
        .catch((err) => setImageUrlError(err))
        .finally(() => setImageUrlLoading(false))

    },[fact])
    // NO se puede entregar la imagen hasta no tener el hecho, por eso se coloca como dependencia el fact 

    const factMessage = () => {
        if (factError) return <p>{`Ha ocurrido un error. ${factError}`}</p>
        else if (factLoading) return <p>{`Cargando`}</p>
        else return fact
    }

    const image = () => {
        if (imageUrlError) return <p>{`Ha ocurrido un error. ${imageUrlError}`}</p>
        else if (imageUrlLoading) return <p>{`Cargando imagen...`}</p>
        else return <img src={imageUrl} alt={`Cat image extracted using the first word from ${fact}`}/>
    }


return (
    <>
        <main>
            <h1>App de Gatos (prueba tecnica)</h1>
            <section>
                {factMessage()}
                {image()}
            </section>
        </main>
    </>
    )
}; 

const App = () => {
    return (
        <>
            <CatComponent/>
        </>
    )
}

export default App
