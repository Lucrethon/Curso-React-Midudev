import { Router } from "./components/Router"
import { routes, URLs } from "./types"
import { PageError404 } from "./components/DefaultComponent"
import { Route } from "./components/Route"
import { HomePage } from "./pages/HomePage"
import { AboutPage } from "./pages/AboutPage"

const App = () => {



    return (
        <main>
            <h1>React Router</h1>
            <Router routes={routes} defaultComponent={PageError404}>

                <Route path={URLs.HOME} component={HomePage}></Route>
                <Route path={URLs.ABOUT} component={AboutPage}></Route>

            </Router>

        </main>
    )
}

export default App


// {/* Esto es un Multiple Page Aplitacion porque esta renderizando toda la pagina cada vez que se va a un enlace */}
// {currentPath === (URLs.HOME) && <HomePage/>} 
// {currentPath === (URLs.ABOUT) && <AboutPage/>} 