import * as React from 'react'
import {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {IPokemon, ITranslateContext} from '../Interfaces/SharedInterfaces';
import {useStockPokemon} from "../Service/Stockage";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {EPokemonFetch, fetchPokemonBy} from "../Service/FetchPokemonBy";
import {Pokemon} from '../Models/Pokemon';
import styles from './CardStyles'
import {mainContext} from "../Context/TranslateContext";
import {ICardProps} from "./Interfaces";
import {AxiosResponse} from "axios";

/**
 * Component card pour chaque pokemon
 * affiche image, type et button capturé ou pas
 * @param props
 * @constructor
 */
const Card = (props: ICardProps) => {
    const context = useContext<ITranslateContext>(mainContext)
    const goToDetails = () => {
        props.selected(pokemon as IPokemon)
    }

    const {
        capture,
        setPokemonInStorage,
        checkCaptured
    } = useStockPokemon()

    const [pokemon, setPokemon] = useState<IPokemon | undefined>(undefined)
    useEffect(() => {
        (async () => {
            const response = await fetchPokemonBy(EPokemonFetch.EPokemon, props.pokemon.name) as AxiosResponse
            if(!response) return
            const pokemon = new Pokemon(response.data as any)
            setPokemon(_ => {
                checkCaptured(pokemon, (captured: boolean) => {
                    pokemon.captured = captured
                })
                return pokemon
            })
        })()
    }, [])

    const setInSessionStorage = () => {
        setPokemon(prevState => {
            let newPokemon = {...prevState as IPokemon, captured: !capture}
            setPokemonInStorage(newPokemon as IPokemon, !capture).then(console.log)
            return newPokemon
        })
        props.checked()
    }

    if (!pokemon) {
        return <View></View>
    }
    return (
        <View ref={props.last}
              style={[
                  styles.container, {
                      display: props.filterByCaptured ? pokemon?.captured ? "flex" : "none" : "flex"
                  }]
              }>
            <View style={styles.cardImage}>
                <TouchableOpacity
                    style={[styles.pokemonNumber, {
                        margin: "auto",
                        height: 30,
                        width: 30,
                        backgroundColor: "#D25B70",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100,
                    }]}
                ><Text>{pokemon?.id}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.pokemonImage}
                    onPress={goToDetails}
                >
                    <Image
                        style={styles.innerPokemonImage}
                        resizeMode={"contain"}
                        source={{
                            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
                            height: 100,
                            width: 100
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.text}>{props.pokemon.name}</Text>
                <View>
                    <Text>{context.translation('TypePokemon')}:</Text>
                    {pokemon?.types.map((type, i: number) => {
                        return (<Text style={{marginLeft: 15}} key={i}>{type.name}</Text>)
                    })}
                </View>
            </View>
            <View style={{flex: 1, height: "100%", justifyContent: "flex-start"}}>

            </View>
            <View style={{margin: "auto", alignItems: "center", marginTop: 5, marginRight:30}}>
                <View style={{height: 15, margin: 0, marginBottom: 5,}}>
                    {capture ? <Text style={{margin: "auto", fontWeight: "bold"}}>Captured</Text> : <Text></Text>}
                </View>
                <TouchableOpacity
                    style={{
                        margin: "auto",
                        height: 50,
                        width: capture ? 70 : 50,
                        backgroundColor: capture ? "#D25B70" : "#ffeeec",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50 * 2,
                    }}
                    onPress={setInSessionStorage}>
                    <Text style={{fontSize: 15, color: "#fff"}}>{!capture ? "⬜" : "✔"}</Text>
                </TouchableOpacity>
            </View>
        </View>)

}

export default Card;
