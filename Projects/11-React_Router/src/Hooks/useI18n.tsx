import { useEffect, useState } from "react"
import type { Lang, PagesAndComponents } from "../types"
import { Langs } from "../types"
import { i18n } from "../i18n"


export const useI18n = (lang = Langs.spanish) => {

    const localStorage = window.localStorage.getItem('lang')
    const initialState = localStorage ? JSON.parse(localStorage) : Langs.spanish
    const [language, setLanguage] = useState<Lang>(initialState)

    useEffect(() => {
        window.localStorage.setItem('lang', JSON.stringify(language))
    }, [language])

    const changeLang = (lang: Lang) => {
        setLanguage(lang)
    }

    const i18nObject = i18n[lang] as PagesAndComponents

    
    return { language, changeLang, i18nObject }

}