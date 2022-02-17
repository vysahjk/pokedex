import axios from "axios";
import {useEffect, useState} from "react";
import {IPokemon} from "../Interfaces/Interfaces";
axios.defaults.baseURL = "https://pokeapi.co/api/v2"

interface IResponseSearch {
    limit: number
    offset: number
    hasMore: boolean
    loading: boolean
    listPokemon: IPokemon[]
}

const fetchAllPokemon = (limit: number, offset: number) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [listPokemon, setListPokemon] = useState<Array<IPokemon>>([])

    useEffect(() => {
        setLoading(true)
        if(offset >= 0){
            axios.get(`/pokemon?limit=${limit}&offset=${offset}`)
                .then(response => {
                    setListPokemon( prevState => {
                        return [...new Set([...prevState, ...response.data.results])]
                    })

                    setHasMore(response.data.results.length > 0)
                    setLoading(false)
                })
        }
    }, [offset])

    return {limit, offset, hasMore, loading, listPokemon} as IResponseSearch
}

export default fetchAllPokemon;