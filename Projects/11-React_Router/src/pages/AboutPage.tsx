import { navigate } from "../components/Link"

export const AboutPage = () => {
    return (
        <>
            <h1>About</h1>
            <div>
                <p>Soy Super Lulu y estoy creando un clon de React Router</p>
                <img src="https://avatars.githubusercontent.com/u/191651326?v=4" alt="Foto de SuperLulu"/>
            </div>
            <button onClick={() => navigate('./home')}>Ir Al Home</button>
        </>
    )
}
