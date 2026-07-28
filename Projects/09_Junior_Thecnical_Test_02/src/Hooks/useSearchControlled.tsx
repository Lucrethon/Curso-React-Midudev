   import { useEffect, useState, useRef } from 'react'





 export const useSearchControlled = () => {

    // ---------------- Formas CONTROLADAS de obtener la información de los formularios a través del DOM ---------------

    const [search, setSearch] = useState('');
    // creamos un estado y se lo pasamos al input como value, por ende, movie sería el value del input

    const [error, setError] = useState<string | null>(null)

    // a la propiedad onChange del input, que se activa cuando el usuario modifica el valor, le pasamos una función que haga el setState (en este caso, setMovie) para que se actualice el estado cada vez que se actualice el input
    // la desventaja de esto es que es mas lento: se rendetiza el componente cada vex que se actualiza el input 
    
    const updateSearch = (search: string) => {
        setSearch(search)
    }


    const isFirtsInput = useRef(true)
    // utilizamos un useRef para que no se coloque el error de "no se ha escrito ninguna pelicula" cuando ni siuiqera hemos escrito nada 
    // se utiza una referencia porque el boleano SOBREVIVE a los renders, entonces en cada render del useEstate, el useRef se va a mantener igual


    useEffect(() => {

        // validaciones

        // Es la primera vez que el usuario interactúa?
        if (isFirtsInput.current) {
            isFirtsInput.current = search === ''
            return
        }

        if (search == "") {
            setError("No se puede buscar una pelicula vacía")
            return
        }

        if (search?.length < 2) {
            setError("La búsqueda tiene que tener al menos 2 caracteres")
            return
        }

        // limpiar el estado
        setError(null)

    }, [search])

        return { search, error, updateSearch }
    }