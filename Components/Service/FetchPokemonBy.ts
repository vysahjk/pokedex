import axios from "axios";

/**
 * @param value // value can be "pokemon" or "pokemon-species"
 * @param namePokemon
 */
async function fetchPokemonBy(value: string, namePokemon: string){
    return await axios.get(`/${value}/${namePokemon}`)
}

export {
    fetchPokemonBy,
}