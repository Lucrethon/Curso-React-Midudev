import { createContext, useContext, type ReactNode } from "react";
import { useI18n } from "../Hooks/useI18n";
import type { Lang, Pages } from "../types";

type i18nContext = { 
    language: Lang
    changeLang: (lang: Lang) => void
    i18nObject: Pages
}

const I18nContext = createContext<i18nContext | null>(null)

export const I18nProvider = ({children} : {children: ReactNode}) => {
    const { language, changeLang, i18nObject } = useI18n()

    return (
        <I18nContext.Provider value={{ language, changeLang, i18nObject }}>
            {children}
        </I18nContext.Provider>
    )
}

export const useI18nContext = () => {
    const context = useContext(I18nContext)

    if (!context) {
        throw new Error("useI18nContext solo se puede usar dentro de I18nContext.Provider")
    }
    return context
}