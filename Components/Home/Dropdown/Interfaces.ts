import {ITranslations} from "../../Interfaces/SharedInterfaces";

export interface IDropdown {
    items: Array<string | keyof ITranslations>
}