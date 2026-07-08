import {useEffect, useState} from 'react'

// const catEndpointImageUrl = `https://cataas.com/cat/says/${firstWord}?json=true`

export const useCatImageUrl = ({ fact } : {fact: string}) => {

    const [imageUrl, setImageUrl] = useState<string>("")
    const [imageUrlError, setImageUrlError] = useState<string | null>(null)
    const [imageUrlLoading, setImageUrlLoading] = useState<boolean>(true)


    // obtener la imagen cada vez que cambie el hecho
    // con solamente fetch 

    const getImageUrl = () => {
        // recuperar la primera palabra del fact 
        const firstWord = fact.split(" ")[0]
        // recuperar las tres primeras palabras del fact
        // const threeWords = fact.split(" ").slice(0, 3).join(" ")

        return fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
        .then(res => {
            if (!res.ok) throw new Error("No se ha podido cargar la imagen")
            return res.json()
        })
        .then(picture => setImageUrl(picture.url)
        )
        .catch((err) => setImageUrlError(err))
        .finally(() => setImageUrlLoading(false))
    }

    useEffect(
        () => {
            if (!fact) return // si no hay un hecho, no se ejecuta el efecto
            getImageUrl()
        },[fact])
        // NO se puede entregar la imagen hasta no tener el hecho, por eso se coloca como dependencia el fact 

    return { imageUrl, imageUrlError, imageUrlLoading }
}