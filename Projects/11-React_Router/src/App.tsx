import { URLs } from "./types"
import { Router } from "./components/Router"
import { routes } from "./types"
import { DefaultComponent } from "./components/DefaultComponent"

const App = () => {



    return (
        <main>
            <h1>React Router</h1>
            {<Router routes={routes} defaultComponent={DefaultComponent}/>}

        </main>
    )
}

export default App


// {/* Esto es un Multiple Page Aplitacion porque esta renderizando toda la pagina cada vez que se va a un enlace */}
// {currentPath === (URLs.HOME) && <HomePage/>} 
// {currentPath === (URLs.ABOUT) && <AboutPage/>} 