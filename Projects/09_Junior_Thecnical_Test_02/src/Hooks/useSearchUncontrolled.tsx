 // nuevo hook: useRef
import React, { useRef } from 'react'
// crea una referencia mutable que persiste para todo el ciclo de vida del componente 
// es decir: su valor no se reinicia 
// con el useState, su valor de reinicia con cada renderizado
// util para guardar cualquier valor que quieras mutar (identificador, contador, elemento DOM)
// cada vez que cambia ese valor, NO vuelve a renderizar el componente 
// A diferencia del useState, que cada vez que cambia, renderiza el componente 


export const useSearchUncontrolled = () => {


    // ---------------- Formas NO controladas de obtener la información de los formularios a través del DOM ---------------

    

    // Metodo para obtener los datos del input con el hook useRef

    const inputRef = useRef<HTMLInputElement>(null)
    // para guardar un elemento del DOM, siempre se debe inicializar en null (porque el elemento no existe hasta que React dibuja la pantalla) y decirle a TypeScript qué tipo de elemento va a guardar.
    // En este caso, el elemento es un input, por lo que se usa HTMLInputElement
    
    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        // esto previene el comportamiento por default del elemento html, en este caso un form
        // de esta forma no se recarga la página al enviar un submit sino que se pueden validar primero los datos antes de enviar

        const input = inputRef.current?.value
        // aqui estamos guardando el elemento del DOM en una referencia 
        // siempre que se quiera acceder a una referencia en React, se utiliza la propiedad current 
        alert(input)
    };




    // Metodo para obtener los datos del imput con JS puro

    const handleImput = (event: React.SyntheticEvent<HTMLFormElement>) => {
        // evitar que la pagina se recargue 
        event.preventDefault();

        // event.target es el <form> entero. 
        // FormData extrae todos los inputs que tengan el atributo 'name'
        const formData = new FormData(event.currentTarget);
        // el .target es el original, pero en TS no funciona. Target puede ser el boton que el usuario clickeo, mientras que currentTarget siempre apunta al elemento que tiene el evento pegado (en este, <form>)

        // para obtener los datos listos de todo el form: 
        const datosListos = Object.fromEntries(formData);
        console.log(datosListos)

        // para obtener los datos de un name en específico: 
        const data = formData.get('movie') as string
        // (Añadimos 'as string' para que TS sepa que no es nulo ni un archivo)

        // validaciones: 
        if (data == '') {
            throw new Error("No se encontro ninguna pelicula")
        }

    }; 

    return {handleImput, handleSubmit, inputRef}
}
