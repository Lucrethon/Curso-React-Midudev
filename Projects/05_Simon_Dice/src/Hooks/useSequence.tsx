import { setRandomSequence, getRandomIndices } from '../utils.tsx'
import { useState } from 'react'
import type {colors} from '../types_&_enums.tsx'
import {COLORS} from '../types_&_enums.tsx'


const colors = Object.values(COLORS) as colors[]


export const useSequence = () => {
    const [sequence, setSequence] = useState<colors[]>(setRandomSequence(colors, getRandomIndices(colors, 3)));
    
    const createNewSequence = () => {
        setSequence(setRandomSequence(colors, getRandomIndices(colors, 3))); // crear nueva secuencia 
    }

       // añadir color a la secuencia:

    const addColorToSequence = () => {

        // Funcion para agregar un elemento a la secuencia y la guarda.
        const newsequence = [...sequence]
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        newsequence.push(randomColor);
        setSequence(newsequence);
        return newsequence;
        
    };


    return { sequence, createNewSequence, addColorToSequence }
}