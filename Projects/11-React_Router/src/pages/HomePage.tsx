import { URLs } from "../types"
import { Link } from "../components/Link"
import { useI18n } from "../Hooks/useI18n"
import type { Params } from "../types"


export const HomePage = ({routeParameters} : {routeParameters?: Params}) => {

    const i18n = useI18n(routeParameters?.lang)
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