import { Langs, URLs, type Params } from "../types"
import { Link } from "../components/Link"
import { i18n } from "../types"
import type { Lang } from "../types"

const useI18n = (lang: Lang) => {
    return i18n[lang]
}

export const AboutPage = ({routeParameters} : {routeParameters: Params}) => {

    const i18n = useI18n(routeParameters?.lang ?? Langs.spanish)

    return (
        <>
            <h1>{i18n.title}</h1>
            <div>
                <p>{i18n.description}</p>
                <img src="https://avatars.githubusercontent.com/u/191651326?v=4" alt="Foto de SuperLulu"/>
            </div>
            <Link to={URLs.HOME}>{i18n.button}</Link>
        </>
    )
}

export default AboutPage