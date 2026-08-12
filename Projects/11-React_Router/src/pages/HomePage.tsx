import { navigate } from "../components/Link"

export const HomePage = () => {
    return (
        <>
            <h1>Home</h1>
            <p>Pagina de ejemplo para crear un React Router desde cero hecha por Super Lulu</p>
            <button onClick={() => navigate('./about')}>Sobre Mi</button>
        </>
    )
}
