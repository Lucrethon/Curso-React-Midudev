import { Router } from "./components/Router"
import { routes, URLs } from "./types"
import { PageError404 } from "./components/DefaultComponent"
import { Route } from "./components/Route"
import { lazy, Suspense } from "react"
import { Language } from "./components/Language"

const HomePage = lazy(() => import("./pages/HomePage"))
const AboutPage = lazy(() => import("./pages/AboutPage"))


const App = () => {



    return (
        <main>
            <h1>React Router</h1>
            <Language/>
            <Suspense fallback={<div>Loading...</div>}>
                <Router routes={routes} defaultComponent={PageError404}>

                    <Route path={URLs.HOME} Component={HomePage}></Route>
                    <Route path={URLs.ABOUT} Component={AboutPage}></Route>

                </Router>
            </Suspense>

        </main>
    )
}

export default App


// {/* Esto es un Multiple Page Aplitacion porque esta renderizando toda la pagina cada vez que se va a un enlace */}
// {currentPath === (URLs.HOME) && <HomePage/>} 
// {currentPath === (URLs.ABOUT) && <AboutPage/>} 