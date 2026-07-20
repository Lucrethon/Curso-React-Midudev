import withResults from '../mocks/with-results.json'
import type { Movie } from '../types'


export const useMovies = () => {

    const movies = withResults.Search as Movie[]

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

    return { movies: appendMovies }
}
