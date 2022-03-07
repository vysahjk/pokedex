import {useCallback, useState} from "react";
import {IPokemon} from "../Interfaces/SharedInterfaces";

/**
 * Service de stockage avec localstorage
 */
const useStockPokemon = () => {
    const [capture, setCapture] = useState<boolean>(false)
    const setPokemonInStorage = useCallback((poke: IPokemon) => {
        let pokes = JSON.parse(sessionStorage.getItem("pokes") ?? JSON.stringify([]))

        if (!capture) {
            pokes.push(poke)
        } else {
            pokes = pokes.filter((p: IPokemon) => p.id !== poke.id)
        }

        if (pokes.length) {
            sessionStorage.setItem("pokes", JSON.stringify(pokes))
        } else {
            sessionStorage.removeItem("pokes")
        }

        setCapture(!capture)
    }, [capture, setCapture])

    const checkCaptured = (pokemon: IPokemon, callback: (captured: boolean) => void) => {
        let pokes = JSON.parse(sessionStorage.getItem("pokes") ?? JSON.stringify([]))
        const names = pokes.map((i: any) => i.name)
        setCapture(names.includes(pokemon.name.trim()))
        callback(names.includes(pokemon.name.trim()))
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