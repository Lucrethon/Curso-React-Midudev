import { useState, useEffect } from 'react'
import './App.css'

// Pricipio de un fetching de datos: 

// Se manejan tres estados: loading, data y error.
// 1. data: es la data que se obtiene de la API
// 2. loading: es un booleano que indica si la data se está cargando. Se utiliza para mostrar un spinner o un mensaje de carga mientras se espera la respuesta de la API
// 3. error: es un booleano que indica si hubo un error al obtener la data. Se utiliza para mostrar un mensaje de error al usuario en caso de que la API no responda o haya algún problema con la conexión a internet.

// el lugar correcto donde se hace el fetching de datos es en un useEffect con un array de dependencias vacío, para que se ejecute una sola vez al montar el componente.

// Ejercicio: Crea un componente llamado <DirectorioPersonajes/>.

// Debes hacer un fetch a esta URL exacta: 
// [https://rickandmortyapi.com/api/character]
// (https://rickandmortyapi.com/api/character)

// Implementa los tres estados: personajes, cargando, y error.

// Muestra un texto de "Cargando personajes..." mientras la petición se resuelve.

// Una vez que lleguen los datos, usa un .map() para renderizar una lista o grilla.

// Por cada personaje, debes mostrar al menos:

// Su nombre.
// Su especie (species).
// Su foto (la API te devuelve una URL directa a la imagen en la propiedad image, puedes usarla en una etiqueta <img src={...} />).

// Cuando hagas await respuesta.json(), el servidor no te va a devolver el array directamente. Te va a devolver un objeto gigante con información sobre la paginación. El array de personajes vive dentro de una propiedad llamada results

const URL = "https://rickandmortyapi.com/api/character";

// de quiktype.io: 


type Location = {
    name: string;
    url:  string;
}

type Status = "Alive" | "Dead" | "unknown";
type Gender = "Female" | "Male" | "unknown";
type Species = "Alien" | "Human";

type Personaje = {
    id:       number;
    name:     string;
    status:   Status;
    species:  Species;
    type:     string;
    gender:   Gender;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

const DirectorioPersonajes = () => {

  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(
    ()=>{
      const getData = async () => {
        try {
          const respuesta = await fetch(URL); 
          // Verificar respuesta (si hay error)
          if (!respuesta.ok) throw new Error("Error en la conexión");
          // Convertir en JSON
          const personajes = await respuesta.json();
          // Guardar los datos en el estado 
          setPersonajes(personajes.results)

        } catch (err) { 
          //'err' es unknown por defecto
          // por ende, se tiene que comprobar el tipo de err con instanceof antes de acceder a sus propiedades 

            // 1. Verificamos específicamente si es un TypeError
            if (err instanceof TypeError) {
              setError(err.message)
            }
            // 2. Verificamos si es un Error general (ReferenceError, SyntaxError, etc.)
            else if (err instanceof Error) {
              setError(err.message)
            }
            // 3. Fallback: capturamos strings, números o cosas extrañas arrojadas (throw "error")
            else {setError(String(err))}
        } finally {
          // pase lo que pase, apagamos el estado de "cargando"
          setLoading(false)
        }
      };
      getData(); 
    }, []);

    const displayPersonajes = (arrayPersonajes: Personaje[]) => {
        return arrayPersonajes.map(
          (personaje: Personaje) => {
            return (
              <div key={personaje.id}>
                <strong>{personaje.name}</strong>
                <p>{`Raza: ${personaje.species}`}</p>
                <div>
                  <img src={personaje.image} alt={`Foto de ${personaje.name}`} />
                </div>
              </div>
            )
          }
        )
    }

    if (loading) return <p>Cargando personajes...</p>
    if (error) return <p>Hubo un error: {error}</p>
    // si estos dos if pasan, es que los datos cargaroncorrectamernte 

    return (
      <div>
        {displayPersonajes(personajes)}
      </div>
    )

}


function App() {

  return (
    <>
      <DirectorioPersonajes />
    </>
  )
}

export default App
