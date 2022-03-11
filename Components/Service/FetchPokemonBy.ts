import axios, {AxiosResponse} from "axios";
import useNavigation from "../Navigation/Navigation";

/**
 * Service pour fetch un pokemon by name or especies
 * @param value // value can be "pokemon" or "pokemon-species"
 * @param namePokemon
 */
async function fetchPokemonBy(value: string, namePokemon: string): Promise<void | AxiosResponse> {
    const navigation = useNavigation()
    return await axios.get(`/${value}/${namePokemon}`).catch(_ => {
        navigation.goTo(null, "Error", {})
        return
    })
}

export {
    fetchPokemonBy,
}
