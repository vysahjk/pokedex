import {IPokemon, ISprites, IType} from "../Interfaces/Interfaces";

class Type implements IType {
    name: string
    url: string

    constructor(data? : any) {
        this.name = ""
        this.url = ""

        if (!!data) {
            const dataClone = {...data};
            for (const property in dataClone) {
                if(property in this){
                    (this as any)[property] = (dataClone as any)[property];
                }
                delete dataClone[property]
            }
        }
    }
}



class Sprites  implements ISprites {
    front_default: string
    versions: {
        gif_default: string
    }

    constructor(data? : any) {
        this.front_default = ""
        this.versions = {
            gif_default: ""
        }

        if (!!data) {
            const dataClone = {...data};
            for (const property in dataClone) {
                if(property in this){
                    (this as any)[property] = (dataClone as any)[property];
                }
                delete dataClone[property]
            }
        }

        this.versions = Object.create({}, {
            "gif_default": {
                value: data?.versions['generation-v']['black-white'].animated.front_default
            }
        })
    }
}

export class Pokemon implements IPokemon {
    id: number
    types: Array<Type>
    name: string
    sprites: Sprites
    captured: boolean
    extendedProps: {
        base_happiness: number
        description: string
        habitat: {
            name: string
            url: string
        }
    }
    setExtendedProps: (data?: any) => this

    constructor(data? : any) {
        this.id = 0
        this.name = ""
        this.types = []
        this.captured = false
        this.extendedProps = {
            base_happiness: 0,
            description: "",
            habitat: {
                name: "",
                url: ""
            }
        }

        this.setExtendedProps = (data?: any) => {
            this.extendedProps = Object.create(this.extendedProps, {
                base_happiness: {
                    value: data.base_happiness
                },
                description: {
                    value: data['flavor_text_entries'][0]['flavor_text'].replace("\n", " ")
                },
                habitat: {
                    value: data.habitat
                }
            })
            return this
        }

        if (!!data) {
            const dataClone = {...data};
            for (const property in dataClone) {
                if(property in this){
                    (this as any)[property] = (dataClone as any)[property];
                }
                delete dataClone[property]
            }
        }
        this.sprites = new Sprites(data?.sprites)
        this.types = data?.types.map((i:any) => new Type(i.type))

    }
}