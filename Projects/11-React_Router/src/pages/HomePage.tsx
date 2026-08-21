import { URLs } from "../types"
import { Link } from "../components/Link"
import { useI18nContext } from "../Context/i18n"

export const HomePage = () => {

    const i18n = useI18nContext()
    const { i18nObject } = i18n
    const { homePage } = i18nObject

    return (
        <>
            <h1>Home</h1>
            <p>{homePage.description}</p>
            <Link to={URLs.ABOUT}>{homePage.navigate}</Link>
        </>
    )
}

export default HomePage;