import * as React from 'react'
import {ActivityIndicator, Button, Text, View} from 'react-native';
import {useCallback, useEffect, useRef, useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {RootParamList} from "../../App";
import {IPokemon} from "../Interfaces/Interfaces";
import fetchAllPokemon from "../Service/FetchAllPokemon";
import useNavigation from "../Navigation/Navigation";
import Search from "./Search/Search";
import Card from "../Card/Card";
import styles from './DexStyles'

type DexProps = StackScreenProps<RootParamList, 'PokeDex'>
const Dex = ({route, navigation}: DexProps) => {

    // Navigation
    const {goTo} = useNavigation()
    const gotTo = (page: string) => {
        goTo(navigation, page, {})
    }
    const onSelectPokemon = (pokemon: IPokemon) => {
        goTo(navigation, "Details", {
            pokemon: pokemon
        })
    }

    // Limit of pokemon list
    const limit = 10
    const [offset, setOffset] = useState<number>(0)
    const {listPokemon, hasMore, loading} = fetchAllPokemon(limit, offset)
    const [countCaptured ,setCountCaptured] = useState<number>(0)

    // When Pokemon is captured
    useEffect(() => {
        onChecked()
    }, [])
    const onChecked = () => {
        let pokes = JSON.parse(sessionStorage.getItem("pokes") ?? JSON.stringify([]))
        setCountCaptured(pokes.length)
    }

    // Observer last Pokemon in list
    const observerLast = useRef<any>();
    const lastPokeMon = useCallback((node) => {
        if (loading) return
        if (observerLast.current)
            observerLast.current.disconnect()
        observerLast.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setOffset(prevState => prevState + limit)
            }
        })
        if (node)
            observerLast.current.observe(node)
    }, [loading, hasMore])


    return (
        <View style={styles.container}>
            <View style={{width: "100%"}}>
                <View style={{margin: "auto", marginBottom: 10, width: "100%"}}>
                    <Button
                        color={"#dd6b4d"}
                        title={"Go back"}
                        onPress={() => gotTo("Home")}/>
                </View>
                <Text style={{
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                    marginBottom: 20
                }}>Pokédex de {route.params.userName}</Text>
            </View>

            <View style={{width: "90%"}}>
                <Search numberCaptured={countCaptured} listPokemon={listPokemon}>
                    {(pokes: Array<IPokemon>, filterByCaptured: boolean) => (
                        <View>
                            {pokes.map((poke: any, i: number) => {
                                if (pokes.length >=10 && listPokemon.length === (i + 1)) {
                                    return <Card
                                        key={i}
                                        pokemon={poke}
                                        checked={onChecked}
                                        selected={onSelectPokemon}
                                        filterByCaptured={filterByCaptured}
                                        last={lastPokeMon}
                                    />
                                } else {
                                    return <Card
                                        key={i}
                                        checked={onChecked}
                                        filterByCaptured={filterByCaptured}
                                        selected={onSelectPokemon}
                                        pokemon={poke}
                                    />
                                }
                            })}
                        </View>
                    )}
                </Search>
            </View>

            {loading ? <View style={{height: 100}}><ActivityIndicator size={"large"} color={"salmon"}/></View> : <></>}

        </View>)
}

export default Dex;