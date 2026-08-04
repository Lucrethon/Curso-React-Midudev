import { CartIcon } from "./Icons";
import './FooterCart.css'

export const FooterCart = () => {
    return (
        <footer className="footer-cart">
            <div>
                <button>
                    <CartIcon/>
                </button>
            </div>
        </footer>
    )
}