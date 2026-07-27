// import withResults from '../mocks/with-results.json'
// import withoutResults from '../mocks/without-results.json'
import type { Movie, NoResults, Results } from '../types'
import { useRef, useState } from 'react'



export const useMovies = ( {search} : {search: string | null} ) => {

    const [responseMovies, setResponseMovies] = useState<Movie[]>([])
    const [searchError, setSearchError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const previousSearch = useRef(search)
    


    const API_KEY = '26060f05'
    // const movies = withResults.Search as Movie[]
    // const noResults = withoutResults as NoResults

    // Este mapeo de datos SOLO SE HACE CUANDO ES JAVASCRIPT, NO EN TYPESCRIPT
    // En TS es redundante 

    // const appendMovies = movies.map(
    //     (movie: Movie) => {
    //        return {
    //             Title:  movie.Title,
    //             Year:   movie.Year,
    //             imdbID: movie.imdbID,
    //             Type:   movie.Type,
    //             Poster: movie.Poster,
    //         } as Movie
    //     }
    // )

    
    const searchMovies = async () => {

        if (search == previousSearch.current) return

        const controller = new AbortController(); 
        const anthena = controller.signal
        // si hay una busqueda
        if (search) try {

                setResponseMovies([])
                setSearchError("")
                setLoading(true)
                previousSearch.current = search

                const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`, {
                    signal: anthena
                })
                // Verificar respuesta (si hay error)
                if (!response.ok) throw new Error("Error de conexión");

                const data = await response.json() as Results | NoResults

                if (data.Response === "False") {
                    throw new Error("No se ha encontrado ninguna coincidencia")
                }

                else {
                    const movies = data.Search
                    setResponseMovies(movies)
                }

            } catch (err) {
                if (err instanceof TypeError || err instanceof Error) {
                    setSearchError(err.message)
                }
                else if (err instanceof Error && err.name === 'AbortError') {
                    setSearchError("Petición cancelada")
                }
                else {
                    setSearchError(String(err))
                }
            } finally {
                setLoading(false)
            }

            return () => {
                controller.abort();}

        
        // if (search) {
        //     fetch(`http://www.omdbapi.com/?apikey=26060f05&s=${search}`)
        //     .then(res => res.json())
        //     .then(json => {
        //         const movies = json as Results
        //         setResponseMovies(movies.Search as Movie[])
        //     })

        // }

        // else {
        //     setResponseMovies(noResults)
        // }
    }


    return { searchMovies, responseMovies, searchError, loading }
}
