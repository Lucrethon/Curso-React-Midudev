import {useEffect, useState} from 'react'
const catEndpointRandomFact = "https://catfact.ninja/fact "

export const useCatfact = () => {
    const [fact, setFact] = useState<string>("")
    const [factError, setFactError] = useState<string | null>(null)
    const [factLoading, setFactLoading] = useState<boolean>(true)

// obtener la el dato curioso cada vez que se renderice la pagina

    const refrechRandomFact = async () => {
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
    };

    useEffect(
        ()=> {refrechRandomFact()}, []
    );
    // Devolvemos un objeto con los TRES estados ya procesados
    return { fact, factError, factLoading, refrechRandomFact };

}


    // las dependencias vacias hacen que se ejecute una sola vez al montar el componente

    // si el efecto es un condicional del useEffect, ahi se tiene que colocar fact en las dependencias
    // si se pone fact, se ejecutaria cada vez que fact cambie (osea, cada vez que se haga un setFact), y eso generaria un loop infinito

    // si no se coloca ningun array, se genera un loop infinito, porque cada vez que se ejecuta el useEffect, se cambia el estado de fact, y eso hace que se vuelva a ejecutar el useEffect
    // esto puede servir para tracking cambios de estado, pero en este caso no es necesario