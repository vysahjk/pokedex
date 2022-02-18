import React, {createContext, useState} from "react";
import {ITranslation, ITranslations, translations} from '../translations'

export interface IMainContext {
    lang: string
    setMessages: (lang: keyof ITranslations) => void
    translation: (id: keyof ITranslation) => string
}

const MainContext = createContext<IMainContext>({
    lang: "en",
    setMessages: (_: string) => {},
    translation: (id: keyof ITranslation) : string => {
        return translations["en"][id]
    }
})

interface IContextComponent {
    children:  React.ReactChild | React.ReactFragment
}

const ContextComponent = (props: IContextComponent) => {
    const [lang, setLang] = useState<keyof ITranslations>("en")
    return (
        <MainContext.Provider value={{
            lang: lang,
            translation: (id: keyof ITranslation) : string => {
                return translations[lang][id]
            },
            setMessages: (lang: keyof ITranslations) => setLang(lang)
        }}>
            {props.children}
        </MainContext.Provider>
    )
}

export const mainContext = MainContext
export default ContextComponent