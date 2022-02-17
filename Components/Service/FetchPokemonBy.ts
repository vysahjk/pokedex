import axios from "axios";

async function fetchPokemonBy(value: string, namePokemon: string){
    return await axios.get(`/${value}/${namePokemon}`)
}

export {
    fetchPokemonBy,
}