import * as React from 'react'
import {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {IPokemon, ITranslateContext} from '../Interfaces/SharedInterfaces';
import {useStockPokemon} from "../Service/Stockage";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {fetchPokemonBy} from "../Service/FetchPokemonBy";
import {Pokemon} from '../Models/Pokemon';
import styles from './CardStyles'
import {mainContext} from "../Context/TranslateContext";
import {ICardProps} from "./Interfaces";

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
            const {data: next} = await fetchPokemonBy("pokemon", props.pokemon.name)
            const pokemon = new Pokemon(next as any)
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
            setPokemonInStorage(newPokemon as IPokemon)
            return newPokemon
        })
        props.checked()
    }

    if (!pokemon) {
        return <></>
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
                        height: "2rem",
                        width: "2rem",
                        backgroundColor: "#D25B70",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100,
                    }]}
                >{pokemon?.id}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.pokemonImage}
                    onPress={goToDetails}
                >
                    <Image
                        style={styles.innerPokemonImage}
                        source={{
                            uri: pokemon?.sprites?.front_default,
                            height: 100,
                            width: 100
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.text}>{props.pokemon.name}</Text>
                <div>
                    <Text>{context.translation('TypePokemon')}:</Text>
                    {pokemon?.types.map((type, i: number) => {
                        return (<li style={{marginLeft: 15}} key={i}>{type.name}</li>)
                    })}
                </div>
            </View>
            <View style={{flex: 1, height: "100%", justifyContent: "flex-start"}}>
                <div style={{height: 15, margin: "0 auto"}}>
                    {capture ? <Text style={{margin: "auto", fontWeight: "bold"}}>Captured</Text> : <></>}
                </div>
                <div style={{margin: "auto", marginTop: 5,}}>
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
                        <Text style={{fontSize: 15, color: "white"}}>{!capture ? "⬜" :
                            <FontAwesomeIcon icon={faCheck}/>}</Text>
                    </TouchableOpacity>
                </div>
            </View>
        </View>)

}

export default Card;