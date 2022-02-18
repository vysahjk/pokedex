import React, {createContext, useState} from "react";
import {translations} from '../translations'
import {ITranslateComponent, ITranslateContext, ITranslation, ITranslations} from "../Interfaces/SharedInterfaces";

const TranslateContext = createContext<ITranslateContext>({
    lang: "en",
    userName: "",
    setUserName: (_: string) => {},
    setMessages: (_: string) => {},
    translation: (id: keyof ITranslation) : string => {
        return translations["en"][id]
    }
})

const ContextComponent = (props: ITranslateComponent) => {
    const [userName, setUserName] = useState<string>("")
    const [lang, setLang] = useState<keyof ITranslations>("en")
    return (
        <TranslateContext.Provider value={{
            lang: lang,
            userName: userName,
            setUserName: (userName: string) => setUserName(userName),
            setMessages: (lang: keyof ITranslations) => setLang(lang),
            translation: (id: keyof ITranslation) : string => {
                return translations[lang][id]
            },
        }}>
            {props.children}
        </TranslateContext.Provider>
    )
}

export const mainContext = TranslateContext
export default ContextComponent