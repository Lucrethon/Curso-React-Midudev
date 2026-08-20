import { useId} from "react"
import { Langs, type Lang } from "../types"
import { useI18nContext } from "../Context/i18n"

export const Language = () => {

    const languageFilterId = useId()
    const { changeLang, i18nObject } = useI18nContext()

    const handleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget)
    const language = event.currentTarget.value as Lang
    changeLang(language)

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