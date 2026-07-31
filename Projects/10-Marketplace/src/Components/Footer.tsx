import './Footer.css'
import { useFilterContext } from '../Context/filters'

export const Footer = () => {
    const {filters} = useFilterContext()
    return (
        <footer className='footer'>
            <h4>Prueba tecnica de React</h4>
            <span>Lucrethon</span>
            <h5>Shoping Card with useContext & useReducer</h5>
            {
                JSON.stringify(filters)
            }
        </footer>
    )
}