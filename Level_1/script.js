// -------------- Import Reac ------------------

// Importas ReactDOM desde la URL de la CDN
import ReactDOM from "https://esm.sh/react-dom@18.2.0/client";

// Nota: Para que React funcione, usualmente también necesitarás importar React:
import React from "https://esm.sh/react@18.2.0";

// Se puede aprender react sin instalar nada

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

// Tenemos que tener un sitio donde renderizar nuestra APP, asi que se empieza por un div en HTML

const appDomElement = document.getElementById("root");

// React se puede utilizar para inyectarlo en un componente en específico en cualquier web
// En React se crea como un "arbol de comopentes". Y se empieza desde una base que se crea así: 

const root = ReactDOM.createRoot(appDomElement);
// Una vez creado, ya podemos decirle que queremos renderizar dentro

root.render("Hola React")
// Dentro de "render", no se pueden renderizar texto HTML plano: 

// root.render("<button>Me gusta>button>") <- ESTO NO SE PUEDE

// Esto es por un tema de seguridad: asi no se le puede inyectar codigo a react

// Se tiene que crear el elemento HTML para decirle a React que queremos renderizar concretamente 

const buttonReact1 = React.createElement("button", {"dataid": 123}, "Button 1"); 
const buttonReact2 = React.createElement("button", {"dataid": 456}, "Button 2"); 
const buttonReact3 = React.createElement("button", {"dataid": 789}, "Button 3"); 


// Parametro de React.createElement()

// Parametro 1: El elemento a crear
// Parametro 2: los atributos o propiedades que le queremos dar (Class name, etc). Esto es un objeto
// Parametro 3: texto (innerHTML)

// Para renderizar los tres botones, no podemos hacer: 

// root.render(buttonReact1, buttonReact2, buttonReact3); <= ESTO NO ES CORRECTO

// No se pueden renderizar mas de un elemento a la vez

// Lo que se hace es crear un elemento que envuelva a todos los elementos que queremos renderizar (como un div que contiene los buttons):

const div = React.createElement("div", null, [buttonReact1, buttonReact2, buttonReact3]); 
root.render(div); 
// Aqui ya se renderizan los tres botones  

// Pero que pasa si no quieres utilizar un Div? 
// React tiene un componente propio para envolver elementos: React.Fragment 

const fragment = React.createElement(React.Fragment, null, [buttonReact1, buttonReact2, buttonReact3]); 
root.render(fragment); 
// Aqui ya se renderizan los tres botones, pero se estan rendetizando encima de los anteriores 

// Es mejor un React.Fragment para dejar el HTML lo más limpio posible 

// El codigo hasta aquí TODAVIA NO ES DECLARATIVO 
// Para esto, hay que utilizar JSX: una extención de JS para describir la interfaz de usuario que quieres. Algo así: 


// ------------------ JSX ------------------------

// Esto es el mismo codigo que hicimos arriba 

<React.Fragment>
    <button data-id="123">Button 1</button>
    <button data-id="456">Button 2</button>
    <button data-id="789">Button 3</button>
</React.Fragment>

// Quien se encarga de transformarlo? 
// Babel, SWC
// Son transpiladores o compiladores de codigo donde nosotros escribimos el codigo JSX y lo tranforma a la versión larga de antes 

// JSX NO es codigo HTML, es codigo JS 

// Cosas a saber de JSX: 

// 1. Se pueden colocar expresiones entre corchetes (constantes, funciones, etc. Cosas que devuelvan un valor): 
//    <h1>Hola {1 + 1}</h1> 




