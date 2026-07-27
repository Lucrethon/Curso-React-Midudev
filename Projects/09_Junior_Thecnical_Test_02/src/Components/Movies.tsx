import type { Movie } from  '../types.ts'

export const ListOfMovies = ({ movies }: { movies: Movie[]}) => {

    // Usamos Array.isArray como "type guard" para asegurar que 'movies' es un array.
    if (Array.isArray(movies)) return (
        <ul className='list-of-movies'> {
        movies.map(
            (movie: Movie)=> {
                
                return (
                    <li key={movie.imdbID} className='movie-card'>
                        <h3>{movie.Title}</h3>
                        <p>{`Year: ${movie.Year}`}</p>
                        <img src={movie.Poster} alt={movie.Title}></img>
                    </li>
                )
        })
        }
    </ul>
    )
};

export const NoMoviesResult = ({ searchError } : {searchError: string}) => {
    return (
        <p>{searchError}</p>
    )

}

export const Movies = ({movieList, searchError} : 
    {movieList: Movie[], searchError: string
    }) => {
        const hasMovies = movieList?.length > 0
        
        return (
            hasMovies
            ? <ListOfMovies movies={movieList}/>
            : <NoMoviesResult searchError={searchError}/>
        )

}   