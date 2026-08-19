import { useEffect, useState } from "react"
import type { Lang } from "../types"
import { Langs } from "../types"
import { i18n } from "../i18n"


export const useI18n = (lang: Lang) => {

    const localStorage = window.localStorage.getItem('lang')
    const initialState = localStorage ? JSON.parse(localStorage) : Langs.spanish
    const [language, setLanguage] = useState<Lang>(initialState)

    useEffect(() => {
        window.localStorage.setItem('lang', JSON.stringify(language))
    }, [language])

    const changeLang = () => {
        setLanguage(lang)
    }

    const currentLanguage = i18n[lang]

    
    return { currentLanguage, changeLang }

}