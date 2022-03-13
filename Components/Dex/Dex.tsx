import * as React from 'react'
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import {RootParamList} from "../../App";
import {IPokemon, ITranslateContext} from "../Interfaces/SharedInterfaces";
import fetchAllPokemon from "../Service/FetchAllPokemon";
import useNavigation from "../Navigation/Navigation";
import Search from "./Search/Search";
import Card from "../Card/Card";
import styles from './DexStyles'
import {mainContext} from "../Context/TranslateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DexProps = StackScreenProps<RootParamList, 'PokeDex'>

/**
 * Component secondaire
 * Affiche la liste de pokemon
 * @param route
 * @param navigation
 * @constructor
 */
const Dex = ({navigation}: DexProps) => {
    const context = useContext<ITranslateContext>(mainContext)

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
    const limit = 100
    const [offset, setOffset] = useState<number>(0)
    const {listPokemon, hasMore, loading} = fetchAllPokemon(limit, offset)
    const [countCaptured ,setCountCaptured] = useState<number>(0)

    // When Pokemon is captured
    useEffect(() => {
        AsyncStorage.clear().then(console.log)
        onChecked().then(console.log)
    }, [])
    const onChecked = async () => {
        let pokes = JSON.parse(await AsyncStorage.getItem("pokes") ?? JSON.stringify([]))
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
                <View style={{margin: "auto", marginBottom: 10, marginTop: 30, width: "100%"}}>
                    <Button
                        color={"#dd6b4d"}
                        title={context.translation('GoBack')}
                        onPress={() => gotTo("Home")}/>
                </View>
                <Text style={{
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                    margin: 10
                }}>{context.translation('TitleDex')} {context.userName}</Text>
            </View>
            <SafeAreaView style={{width: "100%"}}>
                <ScrollView>
                    <Search numberCaptured={countCaptured} listPokemon={listPokemon}>
                        {(pokes: Array<IPokemon>, filterByCaptured: boolean) => (
                            <View>
                                {pokes.map((poke: any, i: number) => {
                                    return <Card
                                        key={poke.name+i}
                                        checked={onChecked}
                                        filterByCaptured={filterByCaptured}
                                        selected={onSelectPokemon}
                                        pokemon={poke}
                                    />
                                })}
                            </View>
                        )}
                    </Search>
                </ScrollView>
            </SafeAreaView>
        </View>)
}

export default Dex;
