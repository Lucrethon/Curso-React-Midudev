import withResults from '../mocks/with-results.json'
import withoutResults from '../mocks/without-results.json'
import type { Movie, NoResults, Results } from '../types'
import { useState } from 'react'



export const useMovies = ( {search} : {search: string | null} ) => {

    const [responseMovies, setResponseMovies] = useState<Movie[] | NoResults>([])

    const movies = withResults.Search as Movie[]
    const noResults = withoutResults as NoResults

    // Este mapeo de datos SOLO SE HACE CUANDO ES JAVASCRIPT, NO EN TYPESCRIPT
    // En TS es redundante 
    const appendMovies = movies.map(
        (movie: Movie) => {
           return {
                Title:  movie.Title,
                Year:   movie.Year,
                imdbID: movie.imdbID,
                Type:   movie.Type,
                Poster: movie.Poster,
            } as Movie
        }
    )

    
    const getMovies = () => {

        // si hay una busqueda
        if (search) {
            fetch(`http://www.omdbapi.com/?apikey=26060f05&s=${search}`)
            .then(res => res.json())
            .then(json => {
                const movies = json as Results
                setResponseMovies(movies.Search as Movie[])
            })

        }

        else {
            setResponseMovies(noResults)
        }
    }


    return { appendMovies, getMovies, responseMovies }
}
