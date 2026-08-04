import { CartIcon } from "./Icons";
import './FooterCart.css'
import { useModalContext } from "../Context/modal";


export const FooterCart = () => {

    const { isModalOpen, setIsModalOpen} = useModalContext()

    const handleClick = () => {
        const value = isModalOpen
        setIsModalOpen(!value)
    }

    return (
        <footer className="footer-cart">
            <div>
                <button onClick={handleClick}>
                    <CartIcon/>
                </button>
            </div>
        </footer>
    )
}