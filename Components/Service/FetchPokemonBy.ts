import axios, {AxiosResponse} from "axios";
import useNavigation from "../Navigation/Navigation";

export enum EPokemonFetch{
    EPokemon = "pokemon",
    ESpecies = "pokemon-species"
}
/**
 * Service pour fetch un pokemon by name or especies
 * @param value // value can be "pokemon" or "pokemon-species"
 * @param namePokemon
 */
async function fetchPokemonBy(value: EPokemonFetch, namePokemon: string): Promise<void | AxiosResponse> {
    const navigation = useNavigation()
    return await axios.get(`/${value}/${namePokemon}`).catch(_ => {
        navigation.goTo(null, "Error", {})
        return
    })
}

export {
    fetchPokemonBy,
}
