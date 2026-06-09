import 'react'
import { CharacterCard } from "./character_card"
import { listaPersonajes } from "./character_list"
import type { Character } from "./character_card"
import { useState } from 'react';
import './App.css'

// chl = character list


function lockedCharacters(characterList: Character[]) {
    const lockedList = characterList.filter(character => character.isLocked); 

    return (
        lockedList.map((char: Character) => (
                <CharacterCard key={char.id} character={char} />
        )))
};

function unlockedCharacters(characterList: Character[]) {
    const unlockedList = characterList.filter(character => character.isLocked === false); 

    return (
        unlockedList.map((char: Character) => (
                <CharacterCard key={char.id} character={char} />
        )))
};

function allCharacters(characterList: Character[]) {

    return (
        characterList.map((char: Character) => (
                <CharacterCard key={char.id} character={char} />
        )))
};




function App() {

    const [filtro, setFiltro] = useState<"all" | "unlocked" | "locked">("all");

    // el useState es una especie de "variable" hecha por react para el cabmio de estados. Esta variable se compone de un array [estado, setter para cambiar el estado (una función)]
    // La unica forma de cambiar de estado es mediante la función del segundo parametro
    // esa funcion se llama mediante una funcion anonima (() => setEstado("estado"))

    // para colocar eventos a los componentes HTML en react, se colocan directamente en los parametros HTML 

    const renderizarLista = () => {
    if (filtro === "all") return allCharacters(listaPersonajes);
    if (filtro === "unlocked") return unlockedCharacters(listaPersonajes);
    if (filtro === "locked") return lockedCharacters(listaPersonajes);
  };

  

    return (
        <div className='chl-containerBox'>
            <div className='chl-div-title'>
                <h2 className='chl-title'>Character List</h2>
            </div>
            <div className='chl-buttons'>

                {/* all characters */}

                <button 
                className='chl-button-allFighters chl-button'
                onClick={() => setFiltro("all")}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                    </svg>

                    All Fighters
                </button>

                {/* locked characters */}

                <button 
                className='chl-button-unlocked chl-button'
                onClick={() => setFiltro("unlocked")}> 
                {/* aqui se esta llamando al segundo parametro del array (la funcion setFiltro). Se llama mediante una funcion anonima */}
                    <svg className="w-6 h-6 text-gray-800 dark:text-white icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14v3m4-6V7a3 3 0 1 1 6 0v4M5 11h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"/>
                    </svg>
                    Unlocked
                </button>

                {/* unlocked characters */}

                <button 
                className='chl-button-locked chl-button'
                onClick={() => setFiltro("locked")}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clip-rule="evenodd"/></svg>
                    Locked
                </button>

            </div>
            <div className='chl-characterList'>
                {renderizarLista()}
            </div>

        </div>
    )
}

export default App

// El metodo .map() para arrays es un callback: recibe una función como parámetro, y esa es la función que se va a ejecutar en cada uno de los elementos del array. Sintaxis: 

// miArray.map((elemento, index, arrayOriginal) => {
  // Tu lógica de transformación aquí
// });

// elemento (Obligatorio): Es el ítem actual del array que se está procesando en ese preciso instante. En tu ejercicio, sería el personaje individual (el Knight, luego el Mage, etc.). Puedes llamarlo como quieras (personaje, item, x).

// index (Opcional - Muy usado en React): Es la posición numérica (el índice) del elemento actual dentro del array, empezando desde el 0. En React te servirá muchísimo para usarlo como propiedad key si tus datos no tienen un ID único.

// arrayOriginal (Opcional - Rara vez usado): Es el array completo sobre el cual estás aplicando el .map().

// ⚠️ Regla de oro en React: Cada vez que uses .map(), el primer elemento HTML o Componente que devuelvas debe llevar un atributo llamado key con un valor único (como un ID). Esto le ayuda a React a saber exactamente qué elemento cambió, se eliminó o se agregó sin tener que renderizar toda la lista de nuevo.

// ¿Se entiende mejor ahora el viaje que hace cada elemento dentro del .map()?



