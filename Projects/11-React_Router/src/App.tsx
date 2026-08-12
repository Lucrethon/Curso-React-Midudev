import { useState } from "react"

const HomePage = () => {
    return (
        <>
            <h1>Home</h1>
            <p>Pagina de ejemplo para crear un React Router desde cero hecha por Super Lulu</p>
            <a href="/about">Sobre Mi</a>
        </>
    )
}

const AboutPage = () => {
    return (
        <>
            <h1>About</h1>
            <div>
                <p>Soy Super Lulu y estoy creando un clon de React Router</p>
                <img src="https://avatars.githubusercontent.com/u/191651326?v=4" alt="Foto de SuperLulu"/>
            </div>
            <a href="/home">Ir al Home</a>
        </>
    )
}


const App = () => {

    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    return (
        <main>
            <h1>React Router</h1>
            {currentPath === '/home' && <HomePage/>} 
            {currentPath === '/about' && <AboutPage/>} 
        </main>
    )
}

export default App