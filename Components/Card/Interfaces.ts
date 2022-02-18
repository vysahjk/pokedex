import {IPokemon} from "../Interfaces/SharedInterfaces";
import {ReactNode} from "react";

export interface ICardProps {
    checked: () => void
    selected: (pokemon: IPokemon) => void
    filterByCaptured: boolean
    last?: (node: ReactNode) => void
    pokemon: IPokemon
}