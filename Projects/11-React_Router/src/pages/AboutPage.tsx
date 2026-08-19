import { Langs, URLs, type Params } from "../types"
import { Link } from "../components/Link"
import { i18n } from "../i18n"
import type { Lang } from "../types"
import React, { useId } from "react"
import { navigate } from "../components/Link"

const useI18n = (lang: Lang) => {
    return i18n[lang]
}

export const AboutPage = ({routeParameters} : {routeParameters: Params}) => {

    const languageFilterId = useId()

    const i18n = useI18n(routeParameters?.lang ?? Langs.spanish)

    const handleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        // const formData = new FormData(event.currentTarget)
        const language = event.currentTarget.value
        navigate(`/${language}` + `${URLs.ABOUT}`)

    }

    return (
        <>  
            <header>
                <form>
                    <label htmlFor={languageFilterId}>Idioma:</label>
                    <select id={languageFilterId} name='language' onChange={handleLanguage}>
                        <option value={Langs.english}>English</option>
                        <option value={Langs.spanish}>Español</option>
                    </select>
                </form>
            </header>
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