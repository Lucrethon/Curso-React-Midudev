import type {colors} from './types_&_enums.tsx'

export const setRandomSecuency  = (colorsArray: colors[], indices: number[]) => {
    return indices.map(index => colorsArray[index]);
    // funcion que recibe dos array: el de colores y el de numeros de indices random 
    // la funcion dice: por cada numero dentro del array de indices, vas a transformarlo en el objeto que corresponde ese numero al indice en el array de colores y generas un nuevo array
    // esto se hace porque el lintern NO admite utilizar funciones "impuras" (que son cambiantes como random) en una funcion 
    // estps se tienen que pasar como parametro
};

export const getRandomIndices = (colorrArray: colors[], numberIndices: number) => {
  const indices = Array.from({length: numberIndices}, () => Math.floor(Math.random() * colorrArray.length))
  return indices
}
