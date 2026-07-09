import { useState, useEffect, use } from 'react'

// ejercicio 6: El Simulador de Carga de Assets
// Vamos a simular la carga de un sprite de un caballero usando Aseprite. No usarás fetch. Tu trabajo es crear una promesa manual con setTimeout y gestionarla en un componente.

// Instrucciones:

// Crea una función llamada simularCargaDeSprite(debeFallar: boolean) que retorne una new Promise.

// Dentro de la promesa, pon un setTimeout de 3 segundos.

// Si debeFallar es false, la promesa debe hacer resolve devolviendo el string "sprite_caballero_ataque.png".

// Si debeFallar es true, la promesa debe hacer reject devolviendo "Error: El archivo del sprite está corrupto".

// Crea un componente en React con un botón "Cargar Asset". Al hacer clic, debe ejecutar la promesa, mostrar "Cargando..." en la pantalla, y finalmente mostrar el string de éxito o el de error.

export const useSprite = () => {

    const [assetSrc, setAssetSrc] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); 
    const [loading, setLoading] = useState<boolean>(true)

    const simularCargaSprite = (mustFail: boolean) => {

        const cargaSprite = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!mustFail) {
                    const imgSource = './../assets/Crawlid_x6.gif'
                    resolve(imgSource)
                } else {
                    reject(null)
                }
            }, 3000)
        })
        return cargaSprite
    }

    const cargarSprite = (mustFail: boolean) => {

        simularCargaSprite(mustFail)
        .then((resultado) => setAssetSrc(resultado as string))
        .catch((err) => setError(err))
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        cargarSprite(false)
    }, []);

    return { assetSrc, error, loading }

}; 

// const AssetButton = (handleClick: () => string) => {
    
//     return (
        
//     )
// }   