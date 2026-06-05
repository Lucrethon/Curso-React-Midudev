
// Importas ReactDOM desde la URL de la CDN
import ReactDOM from "https://esm.sh/react-dom@18.2.0/client";

// Nota: Para que React funcione, usualmente también necesitarás importar React:
import React from "https://esm.sh/react@18.2.0";


//Olvídate de npm install: Al usar esm.sh, estás cargando los módulos directamente desde la web (CDN). Es una excelente opción para prototipos rápidos o proyectos pequeños sin configuraciones complejas de Webpack o Vite.

// -------------- Vanilla JS -----------------

// Codigo sin ninguna librería un dependencia externa 

// Que haríamos si quisieramos que un boton hiciera click? 

// Recuperamos el boton 

const button = document.querySelector("button"); 

// Si repetimos el boton y quisieramos que los tres hicieran lo mismo, se empieza a complicar porque no funciona en los tres con el codigo anterior 
// Tendriamos que recuperar TODOS LOS BOTONES asi: 

const buttons = document.querySelectorAll("button");

//Y hacer un for each para que el codigo funcione en todos los botones


// Al hacer click en un boton, ejecutamos una funcion: 

buttons.forEach(button => {
    // Al hacer click en el boton, ejecutamos una funcion: 

button.addEventListener("click", function() {
    alert("hola")

    // Ahora, al darle al boton, que información estamos recuperando o dandole "Me gusta"? Tiene que tener un ID el boton y JS lo tiene que recuperar

    // Recuperar el ID del boton: 

    const id = button.getAttribute("data-id"); 

    // Actualizar el boton una vez clickeado: 

    if (button.classList.contains("Liked")) {
        button.classList.remove("Liked"); 
        button.innerHTML = "Me gusta"
    } else {
        button.classList.add("Liked"); 
        button.innerHTML = "Quitar Me Gusta"}
})
}); 

//Aqui hay dos problemas: 

// 1. Para hacer esto con varios botones, hemos tenido que poner la logica en el mismo sitio. Es complicado separarlo 
// 2. No es codigo escalable 


// Todo este codigo es IMPERATIVO 
// Le indicamos paso a paso el COMO hay que hacer las cosas. Una serie de instrucciones
// El codigo imperativo no escala bien 

// Con React, hacemos el codigo de forma DELCARATIVA 
// Describimos lo que quiero que haga

// ------------------- React ----------------------




