import './App.css'
import './types.ts'
import {Movies} from './Components/Movies.tsx'
import { useMovies } from './Hooks/useMovies.tsx'


// Crea una aplicación para buscar películas

// API a usar:

// - https://www.omdbapi.com/ 
// - API_KEY: 26060f05

// Requerimientos:

// - Necesita mostrar un input para buscar la película y un botón para buscar.
// - Lista las películas encontradas y muestra el título, año y poster.
// - Haz que las películas se muestren en un grid responsive.

// Primera iteración:

// - Evitar que se haga la misma búsqueda dos veces seguidas.
// - Haz que la búsqueda se haga automáticamente al escribir.
// - Evita que se haga la búsqueda continuamente al escribir (debounce)   



const App = () => {

    const { movies } = useMovies()
    

    return (
        <div className='page'>
            <h1>Prueba Técnica</h1>
            <header className='form-container'>
                <form className='form'>
                    <input placeholder='Star Wars, Toy Story...'></input>
                    <button type='submit'>Buscar</button>
                </form>
            </header>
            
            <main className="movies-container">
                {<Movies movieList={movies}/>}
            </main>
        </div>
    )
}

export default App