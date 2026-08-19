import { useId} from "react"
import { Langs, type Lang } from "../types"
import { useI18nContext } from "../Context/i18n"

export const Language = () => {

    const languageFilterId = useId()
    const { changeLang } = useI18nContext()

    const handleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget)
    const language = event.currentTarget.value as Lang
    // navigate(`/${language}` + `${URLs.ABOUT}`)
    changeLang(language)

}

    return (
    <form>
        <label htmlFor={languageFilterId}>Idioma:</label>
        <select id={languageFilterId} name='language' onChange={handleLanguage}>
            <option value={Langs.english}>English</option>
            <option value={Langs.spanish}>Español</option>
        </select>
    </form>
    )
}