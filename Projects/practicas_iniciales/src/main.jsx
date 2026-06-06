import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'

const root = createRoot(document.getElementById('root')); 

// Como es archivo .jsx, se puede escribir código JSX directamente sin necesidad de usar React.createElement().

// Renderizando los tres botones: 

root.render(
<React.Fragment>
  <button>
    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 7.35304L21 16.647C21 16.8649 20.8819 17.0656 20.6914 17.1715L12.2914 21.8381C12.1102 21.9388 11.8898 21.9388 11.7086 21.8381L3.30861 17.1715C3.11814 17.0656 3 16.8649 3 16.647L2.99998 7.35304C2.99998 7.13514 3.11812 6.93437 3.3086 6.82855L11.7086 2.16188C11.8898 2.06121 12.1102 2.06121 12.2914 2.16188L20.6914 6.82855C20.8818 6.93437 21 7.13514 21 7.35304Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.5 16.7222L12.2914 12.1618C12.1102 12.0612 11.8898 12.0612 11.7086 12.1618L3.5 16.7222" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.52844 7.29363L11.7086 11.8382C11.8898 11.9388 12.1102 11.9388 12.2914 11.8382L20.5 7.27783" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 3L12 12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 19.5V22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    
  </button>
  <button>Hello World</button>
  <button>Hello World</button>

</React.Fragment>
);


// Primer problema:

// Cuando se escribe código JSX, se puede usar cualquier etiqueta HTML válida, no obstante, las propiedades de la misma tienen que estar en camelCase, por ejemplo, en lugar de usar "class" se debe usar "className", y en lugar de "for" se debe usar "htmlFor". Además, el código JSX debe estar envuelto en un solo elemento padre, como un <div> o un <React.Fragment>.

// Segundo problema:

// El SVG es demadiado grande. Si se quieren varios botones con el mismo SVG, es copiar mucho codigo innecesario. Para solucionar esto, se puede crear un componente separado para el SVG y luego usar ese componente dentro de los botones. De esta manera, se puede reutilizar el mismo código SVG sin necesidad de copiarlo varias veces: 

// --------------- Componentes ---------------

// Un componenten es una función que devuelve un elemento de React. Los componentes pueden ser reutilizados en diferentes partes de la aplicación, lo que permite una mayor modularidad y mantenibilidad del código.

const createButton = (text) => {
  return <button>
    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 7.35304L21 16.647C21 16.8649 20.8819 17.0656 20.6914 17.1715L12.2914 21.8381C12.1102 21.9388 11.8898 21.9388 11.7086 21.8381L3.30861 17.1715C3.11814 17.0656 3 16.8649 3 16.647L2.99998 7.35304C2.99998 7.13514 3.11812 6.93437 3.3086 6.82855L11.7086 2.16188C11.8898 2.06121 12.1102 2.06121 12.2914 2.16188L20.6914 6.82855C20.8818 6.93437 21 7.13514 21 7.35304Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.5 16.7222L12.2914 12.1618C12.1102 12.0612 11.8898 12.0612 11.7086 12.1618L3.5 16.7222" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.52844 7.29363L11.7086 11.8382C11.8898 11.9388 12.1102 11.9388 12.2914 11.8382L20.5 7.27783" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 3L12 12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 19.5V22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    {text}
  </button>
};

// Nota: no se puede dejar el return en una sola linea porque JS lo interpreta como el stop de la función, por lo que se debe usar paréntesis para envolver el código JSX.

// Entonces podemos hacer: 

root.render(
  <React.Fragment>
    {createButton("Hello World")}
    {createButton("Hola Mundo")}
    {createButton("Bonjour le Monde")}
  </React.Fragment>
); 

// Todo esto también esta mal porque sigue siendo codigo imperativo. Así no es la forma de crear elementos en React 

// cuando en React creamos una funcion que tiene que devolver un elemento, se le llama componente. 
// Un componente es una función que devuelve un elemento de React. Un componente se ve de esta manera: 

const Button = ({ text }) => {
  return <button>
    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#000000" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 7.35304L21 16.647C21 16.8649 20.8819 17.0656 20.6914 17.1715L12.2914 21.8381C12.1102 21.9388 11.8898 21.9388 11.7086 21.8381L3.30861 17.1715C3.11814 17.0656 3 16.8649 3 16.647L2.99998 7.35304C2.99998 7.13514 3.11812 6.93437 3.3086 6.82855L11.7086 2.16188C11.8898 2.06121 12.1102 2.06121 12.2914 2.16188L20.6914 6.82855C20.8818 6.93437 21 7.13514 21 7.35304Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.5 16.7222L12.2914 12.1618C12.1102 12.0612 11.8898 12.0612 11.7086 12.1618L3.5 16.7222" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.52844 7.29363L11.7086 11.8382C11.8898 11.9388 12.1102 11.9388 12.2914 11.8382L20.5 7.27783" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 3L12 12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 19.5V22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    {text}
  </button>
}; 

// los componentes tienen que escribirse con PascalCase para que React los pueda diferenciar de las etiquetas HTML.

// Y se utilizaría de la siguiente forma: 

root.render(
  <React.Fragment>
    {<Button text="Hello World" />} 
    {<Button text="Hola Mundo" />}
    {<Button text="Bonjour le Monde" />}
  </React.Fragment>
);

// se pasa el texto como una propiedad del componente Button