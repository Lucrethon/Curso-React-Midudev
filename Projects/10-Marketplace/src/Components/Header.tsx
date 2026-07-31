import { Filters } from "./Filters"
import './Header.css'

export const Header = () => {
    return (
        <header>
            <h1>React Shop</h1>
            <Filters/>
        </header>
    )
}