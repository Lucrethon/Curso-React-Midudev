   import React, { useEffect, useState, useRef } from 'react'


 export const useSearchControlled = () => {

    // ---------------- Formas CONTROLADAS de obtener la información de los formularios a través del DOM ---------------

    const [search, setsearch] = useState('');
    // creamos un estado
    // se lo pasamos al input como value, por ende, movie sería el value del input
    const [error, setError] = useState<string | null>(null)

    // a la propiedad onChange del input, que se activa cuando el usuario modifica el valor, le pasamos una función que haga el setState (en este caso, setMovie) para que se actualice el estado cada vez que se actualice el input
    // la desventaja de esto es que es mas lento: se rendetiza el componente cada vex que se actualiza el input  

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // le pasamos el evento a la función para hacer .currentTarget.value y tener el valor 
        const newMovie = event.currentTarget.value
        
        // con esto podemos crear un useEffect para las validaciones y los errores 
        // o dejar las validaciones dentro de esta misma función 

        // si lo dejamos dentro de la función, podemos hacer pre validaciones 
        if (newMovie.startsWith(' ')) return


        setsearch(newMovie)
        // if (movie == "") {
        //     setError("No se ha escrito ninguna película")
        //     return
        // }

        // if (movie?.length < 3) {
        //     setError("La búsqueda tiene que tener al menos 2 caracteres")
        //     return
        // }
    }

    // 
    const isFirtsInput = useRef(true)
    // utilizamos un useRef para que no se coloque el error de "no se ha escrito ninguna pelicula" cuando ni siuiqera hemos escrito nada 
    // se utiza una referencia porque el boleano SOBREVIVE a los renders, entonces en cada render del useEstate, el useRef se va a mantener igual


    useEffect(() => {

        // Es la primera vez que el usuario interactúa?
        if (isFirtsInput.current) {
            // Vacío es igual a vacío? S
            // Si es true, el ref se mantiene en true y el return expulsa al código fuera del useEffect y no se ejecutan las validaciones de abajo
            isFirtsInput.current = search === ''
            // esto es un booleano: se resuelve primero el operador de comparación === antes que el de asignación = 
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

        setError(null)

    }, [search])

        return { search, error, handleChange }
    }