import {ReactChild, ReactFragment} from "react";

export interface ITranslateContext {
    lang: string
    userName: string
    setUserName: (userName: string) => void
    setMessages: (lang: keyof ITranslations) => void
    translation: (id: keyof ITranslation) => string
}

export interface ITranslateComponent {
    children:  ReactChild | ReactFragment
}

export interface ITranslation {
    en: string
    fr: string
    it: string
    es: string
    Welcome: string
    LabelInputName: string
    Start: string
    GoBack: string
    GoBalToList: string
    TitleDex: string
    CountLabel: string
    CapturedLabel: string
    TypePokemon: string
    FilterLabel: string
    SearchPlaceholder: string
    Name: string
    Description: string
    Happiness: string
    Habitat: string
}

export interface ITranslations {
    en: ITranslation
    fr: ITranslation
    it: ITranslation
    es: ITranslation
}

export interface IPokemon {
    id: number,
    types: Array<IType>,
    name: string
    sprites: ISprites
    captured: boolean
    extendedProps: {
        base_happiness: number
        description: string
        habitat: {
            name: string
            url: string
        }
    }
    setExtendedProps: Function
}

export interface IType {
    name: string,
    url: string
}

export interface IVersions {
    "generation-v": object
}

export interface ISprites {
    front_default: string
    versions: {
        gif_default: string
    }
}



