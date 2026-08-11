import { CartIcon } from "./Icons";
import './FooterCart.css'
import { useModalContext } from "../Context/modal";


export const FooterCart = () => {

    const { setIsModalOpen} = useModalContext()

    const handleClick = () => {
        setIsModalOpen(prevState => !prevState)
    }

    return (
        <footer className="footer-cart" data-testid='footer-cart'>
            <div>
                <button onClick={handleClick}>
                    <CartIcon/>
                </button>
            </div>
        </footer>
    )
}