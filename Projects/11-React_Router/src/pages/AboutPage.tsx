import { URLs } from "../types"
import { Link } from "../components/Link"
import { useI18nContext } from "../Context/i18n"

export const AboutPage = () => {

    const i18n = useI18nContext()
    const { i18nObject } = i18n
    const { aboutPage } = i18nObject


    return (
        <>  
            <header>

            </header>
            <h1>{aboutPage.title}</h1>
            <div>
                <p>{aboutPage.description}</p>
                <img src="https://avatars.githubusercontent.com/u/191651326?v=4" alt="Foto de SuperLulu"/>
            </div>
            <Link to={URLs.HOME}>{aboutPage.button}</Link>
        </>
    )
}

export default AboutPage