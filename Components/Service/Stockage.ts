import {useCallback, useState} from "react";
import {IPokemon} from "../Interfaces/SharedInterfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Service de stockage avec localstorage
 */
const useStockPokemon = () => {
    const [capture, setCapture] = useState<boolean>(false)
    const setPokemonInStorage = useCallback( async(poke: IPokemon, captured: boolean) => {
        let pokes = JSON.parse(await AsyncStorage.getItem("pokes") ?? JSON.stringify([]))

        if (!captured) {
            pokes.push(poke)
        } else {
            pokes = pokes.filter((p: IPokemon) => p.id !== poke.id)
        }

        if (pokes.length) {
            await AsyncStorage.setItem("pokes", JSON.stringify(pokes))
        } else {
            await AsyncStorage.removeItem("pokes")
        }

        setCapture(!capture)
    }, [capture, setCapture])

    const checkCaptured = async (pokemon: IPokemon, callback: (captured: boolean) => void) => {
        let pokes = JSON.parse(await AsyncStorage.getItem("pokes") ?? JSON.stringify([]))
        const ids = pokes.map((i: any) => i.id)
        setCapture(ids.includes(pokemon.id))
        callback(ids.includes(pokemon.id))
    }

    return {
        setPokemonInStorage,
        capture,
        checkCaptured,
        setCapture
    }
}

export {
    useStockPokemon
}
