import { URLs } from "../types"
import { Link } from "../components/Link"

export const HomePage = () => {
    return (
        <>
            <h1>Home</h1>
            <p>Pagina de ejemplo para crear un React Router desde cero hecha por Super Lulu</p>
            <Link to={URLs.ABOUT}>Sobre Mi</Link>
        </>
    )
}
