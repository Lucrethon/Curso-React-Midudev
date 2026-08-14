import { URLs } from "../types"
import { Link } from "./Link"

export const PageError404 = () => {

    return (
        <>
            <h1>Error 404</h1>
            <div>
                <img src="https://thenib.com/wp-content/uploads/2019/08/this-is-not-fine-001-dae9d5-1.png" alt="This is not fine"></img>
                <Link to={URLs.HOME}>Volver al Home</Link>
            </div>
        </>
    )
}