import { useEffect, useState } from "react"
import type { Lang } from "../types"
import { Langs } from "../types"
import { i18n } from "../i18n"


export const useLanguage = (lang: Lang) => {

    const localStorage = window.localStorage.getItem('lang')
    const initialState = localStorage ? JSON.parse(localStorage) : Langs.spanish
    const [language, setLanguage] = useState<Lang>(initialState)

    useEffect(() => {
        window.localStorage.setItem('lang', JSON.stringify(language))
    }, [language])

    const changeLang = () => {
        setLanguage(lang)
    }

    const currentLanguage = lang == Langs.english ? i18n.en : i18n.es

    
    return { currentLanguage, changeLang }

}