import { useId} from "react"
import { Langs, type Lang } from "../types"
import { useI18nContext } from "../Context/i18n"
import { useRouterContext } from "../Context/Router"

export const Language = () => {

    const { currentPath, navigate} = useRouterContext()
    const languageFilterId = useId()
    const { changeLang, i18nObject } = useI18nContext()

    const replaceLanguageInPath = (currentPath: string, newLang: Lang) => {
        // separamos en segmentos el current path, separandolos por las barras /
        const pathSegments = currentPath.split('/').filter(Boolean)
        // convertimos el objeto enum de idiomas en un array obteniendo solo los valores
        const knownLangs = Object.values(Langs) as string[] 
        // verificamos si alguno de los idiomas esta en los segmentos del current path y lo sacamos 
        // se coloca en la posicion 0 porque {/lang} esta siempre al principio de la url
        if (knownLangs.includes(pathSegments[0])) {
            pathSegments.shift() // remueve el primer elemento de un array, en este caso el array de segmentos
            // .shift() modifica el array original
        }
        // Reconstruimos la ruta limpia (ej: '/about' o '/')
        // se coloca una barra al principio por home ("/")
        const cleanPath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : ''

        // Devolvemos la ruta con el nuevo idioma
        return `/${newLang}${cleanPath}`
    }

    const handleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget)
    const language = event.currentTarget.value as Lang
    changeLang(language)
    navigate(`${replaceLanguageInPath(currentPath, language)}`)

}

const { languageOptions } = i18nObject

    return (
    <form>
        <label htmlFor={languageFilterId}>{languageOptions.selectLanguage}</label>
        <select id={languageFilterId} name='language' onChange={handleLanguage}>
            <option value={Langs.english}>{languageOptions.languages.english}</option>
            <option value={Langs.spanish}>{languageOptions.languages.spanish}</option>
        </select>
    </form>
    )
}