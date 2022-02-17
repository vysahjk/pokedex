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

