import type { Movie, NoResults } from  '../types.ts'

export const ListOfMovies = ({ movies }: { movies: Movie[] | NoResults | null}) => {

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

export const NoMoviesResult = () => {
    return (
        <p>No se ha encontrado ninguna coincidencia</p>
    )

}

export const Movies = ({movieList} : 
    {movieList: Movie[]}) => {
        const hasMovies = movieList.length > 0
        
        return (
            hasMovies
            ? <ListOfMovies movies={movieList}/>
            : <NoMoviesResult/>
        )

}   