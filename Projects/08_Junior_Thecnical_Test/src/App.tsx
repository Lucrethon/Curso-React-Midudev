import './App.css'
import { useCatfact } from './Hooks/useCatFact.tsx'
import { useCatImageUrl } from './Hooks/useCatImageUrl.tsx'

// # Prueba técnica para Juniors y Trainees de React en Live Coding

// Recupera un fact aleatorio de gatos de la primera API
// Recupera la primera palabra del fact
// Muestra una imagen de un gato con la primera palabra recuperada

// APIs:

// - Facts Random: https://catfact.ninja/fact 
// - Imagen random: https://cataas.com/cat/says/hello    


const CatComponent = () => {

    const { fact, factError, factLoading, refrechRandomFact } = useCatfact()
    const { imageUrl, imageUrlError, imageUrlLoading } = useCatImageUrl({ fact })

    return (
        <>
            <main>
                <h1>Cat App</h1>
                <section>
                    {factLoading && <p>Cargando fact...</p>}
                    {factError && <p>Ha ocurrido un error: {factError}</p>}
                    {fact && <p>{fact}</p>}

                    {imageUrlLoading && <p>Cargando imagen...</p>}
                    {imageUrlError && <p>Ha ocurrido un error: {imageUrlError}</p>}
                    {imageUrl && <img src={imageUrl} alt={`Cat image extracted using the first word from ${fact}`}/>}
                </section>
                <button onClick={refrechRandomFact}>Get Cat Fact</button>
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
