// Ejercicio 2

export const Buttons = (indexArray: number[], handleClick: (value: number)=> void, activePage: number) => {

  return indexArray.map((value: number, index: number) => {
    //su la pagina activa es igual al valor del boton, le asignamos la clase 'active', de lo contrario, no le asignamos ninguna clase.
    const buttonClass = activePage === value ? 'active' : '';
      return (
        // se le pasao una funcion anonima para que al hacer click en el boton, se ejecute la funcion handleClick con el valor del boton como argumento.
        <button onClick={() => handleClick(value)} className={buttonClass} key={index+1}>{value}</button>
      )
    }
  )
};
