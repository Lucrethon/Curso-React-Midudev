// ejercicio 3

export const ListaTareas = (
  listaTareas: string[], 
  eliminarTarea: (index:number)=> void) => 
    {
  return listaTareas.map(
    (value: string, index: number) => {
      return (
        <li className='tarea' key={index+1}>{
          value}
          <button 
          onClick={() => eliminarTarea(index)}>
            Eliminar Tarea
          </button>
        </li>
      )
    }
  )

}