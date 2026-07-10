import { useState, useEffect } from 'react'

// Ejercicio 7: simular la carga de varios sprites en donde cada uno tenga un tiempo de carga diferente y hacer un promise all y que las tres imagenes se muestren en pantalla al mismo tiempo. Si una sola falla, todo falla.

const endPoints = {
crawlid : '/Crawlid_x6.gif',
gruzzer : '/Gruzzer_x6.gif',
shade : '/Shade_on_air_right_x6.gif'
}

export const useSprites = () => {

    const [assetsSrc, setAssetsSrc] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null); 
    const [loading, setLoading] = useState<boolean>(true)

    const randomTime = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const simularCargaSprites = (mustFail: boolean) => {

        const promises = [];

        for (const endpoint of Object.values(endPoints)) {
            const promise = new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                if (!mustFail) {resolve(endpoint)} 
                else {reject("Error al cargar la imagen")}
            }, randomTime(1000, 5000))
        })
        promises.push(promise)
    }
    return promises
}

    const cargarSprites = async (mustFail: boolean = false) => {

        try {
            const res = await Promise.all(simularCargaSprites(mustFail))
            setAssetsSrc(res)
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setLoading(false)
        }
    };

    
    const handleUserClick = (mustFail: boolean = false) => {
        
        // 1. Limpiamos estados antes de pedir la imagen
        setLoading(true);
        setError(null);
        setAssetsSrc(null);
        // 2. Llamamos a la función para cargar la imagen
        cargarSprites(mustFail);
    }

    useEffect(() => {
        const cargaInicial = async (mustFail: boolean = false) => {

        try {
            const res = await Promise.all(simularCargaSprites(mustFail))
            setAssetsSrc(res)
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setLoading(false)
        }
    };
    cargaInicial()
    }, []);

    return { assetsSrc, error, loading, handleUserClick }

}; 
