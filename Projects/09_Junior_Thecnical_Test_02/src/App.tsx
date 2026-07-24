import './App.css'
import './types.ts'
import { Movies } from './Components/Movies.tsx'
import { useMovies } from './Hooks/useMovies.tsx'
import { useSearchControlled } from './Hooks/useSearchControlled.tsx'
import { useSearchUncontrolled } from './Hooks/useSearchUncontrolled.tsx'

// nuevo hook: useRef
import { useRef, type SyntheticEvent } from 'react'


// Crea una aplicación para buscar películas

// API a usar:

// - https://www.omdbapi.com/ 
// - API_KEY: 26060f05

// Requerimientos:

// - Necesita mostrar un input para buscar la película y un botón para buscar.
// - Lista las películas encontradas y muestra el título, año y poster.
// - Que el formulario funcione
// - Hacer Fetching de datos
// - Haz que las películas se muestren en un grid responsive.

// Primera iteración:

// - Evitar que se haga la misma búsqueda dos veces seguidas.
// - Haz que la búsqueda se haga automáticamente al escribir.
// - Evita que se haga la búsqueda continuamente al escribir (debounce)   



const App = () => {

    
    const { search, error, handleChange } = useSearchControlled()
    const { inputRef} = useSearchUncontrolled()
    const { appendMovies, getMovies, responseMovies } = useMovies( {search} )

    
    // Metodo para obtener los datos del imput con JS puro

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {

        // evitar que la pagina se recargue 
        event.preventDefault();
        getMovies()


        // // event.target es el <form> entero. 
        // // FormData extrae todos los inputs que tengan el atributo 'name'

        // const formData = new FormData(event.currentTarget);

        // // el .target es el original, pero en TS no funciona. Target puede ser el boton que el usuario clickeo, mientras que currentTarget siempre apunta al elemento que tiene el evento pegado (en este, <form>)

        // // para obtener los datos listos de todo el form: 

        // const datosListos = Object.fromEntries(formData);
        // console.log(datosListos)

        // // para obtener los datos de un name en específico: 

        // const data = formData.get('movie') as string

        // // (Añadimos 'as string' para que TS sepa que no es nulo ni un archivo)

        // // validaciones: 
        
        // if (data == '') {
        //     throw new Error("No se encontro ninguna pelicula")
        // }

    }; 

    // diferencias entre useReft y useState

    // useState
    let i = 1
    i =+ 1
    console.log(`useState: ${i}`)
    // siempre mostrara 1 en cada renderizado porque el estado se vuelve a reiniciar

    // useRef
    const counter = useRef(1)
    counter.current++
    console.log(`useRef: ${counter.current}`)
    // el counter se irá sumando porque es un valor que persiste entre renders 



    return (
        <div className='page'>
            <h1>Prueba Técnica</h1>
            <header className='form-container'>
                <form className='form' onSubmit={handleSubmit}>

                    <input 
                    
                    ref={inputRef} 
                    name="movie"  

                    placeholder='Star Wars, Toy Story...' 

                    value={search} 
                    onChange={handleChange} 

                    style={{
                        border: '1px solid transparent',
                        borderColor: error ? 'red' : 'transparent'
                    }}>

                    </input>

                    <button type='submit'>Buscar</button>
                </form>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </header>
            
            <main className="movies-container">
                {<Movies movieList={responseMovies}/>}
            </main>
        </div>
    )
}

export default App