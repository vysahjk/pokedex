import * as React from "react";
import {View, Button, SafeAreaViewComponent, SafeAreaView, ScrollView} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {RootParamList} from "../../App";
import {useContext, useEffect, useState} from "react";
import {IPokemon, ITranslateContext} from "../Interfaces/SharedInterfaces";
import {EPokemonFetch, fetchPokemonBy} from "../Service/FetchPokemonBy";
import useNavigation from "../Navigation/Navigation";
import ScreenTop from "./ScreenTop/ScreenTop";
import DisplayField from "./DisplayField/DisplayField";
import {mainContext} from "../Context/TranslateContext";
import {AxiosResponse} from "axios";

type DetailsProps = StackScreenProps<RootParamList, 'Details'>

/**
 * Component qui affiche le detail d'un pokemon
 * @param route
 * @param navigation
 * @constructor
 */
const Details = ({route, navigation}: DetailsProps) => {
    const context = useContext<ITranslateContext>(mainContext)
    const {goTo} = useNavigation()
    const goToPage = (page: string) => {
        goTo(navigation, page, { userName: context.userName })
    }

    const [detailPokemon, setDetailPokemon] = useState<IPokemon | undefined>(undefined)
    useEffect(() => {
        (async () => {
            const response = await fetchPokemonBy(EPokemonFetch.ESpecies, route.params.pokemon.name) as AxiosResponse
            if(!response) return
            setDetailPokemon(route.params.pokemon.setExtendedProps(response.data as any, context.lang))
        })()
    }, [])

    if(!detailPokemon?.extendedProps){
        return <View></View>
    }
    return (
        <View style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            backgroundColor: "#fff",
            justifyContent: "center",
            padding: 10
        }}>
            <SafeAreaView>
                <ScrollView>
                    <View style={{marginBottom: 10, marginTop: 30, width: "100%"}}>
                        <Button
                            color={"#dd6b4d"}
                            title={context.translation('GoBalToList')}
                            onPress={() => goToPage("PokeDex")}/>
                    </View>

                    {ScreenTop(detailPokemon?.sprites.versions.gif_default as string)}

                    <View style={{width: "100%"}}>

                        <DisplayField
                            styles={{
                                width: "100%",
                                fontSize: 16,
                                fontWeight: "bold",
                                textAlign: "center",
                                margin: 10,
                                paddingTop: 15,
                                paddingBottom: 15,
                                backgroundColor: "#dd6b4d",
                                color: "#fff",
                                borderRadius: 5,
                                borderWidth: 1,
                                textTransform: "capitalize"
                            }}
                            title={context.translation('Name')}
                            field={detailPokemon?.name as string} />

                        <DisplayField
                            styles={{
                                width: "100%",
                                fontSize: 16,
                                margin: 10,
                                fontWeight: "bold",
                                textAlign: "center"
                            }}
                            title={context.translation('Description')}
                            field={detailPokemon?.extendedProps.description as string} />

                        <DisplayField
                            title={context.translation('Happiness')}
                            field={detailPokemon?.extendedProps.base_happiness as number} />

                        <DisplayField
                            title={context.translation('Habitat')}
                            field={detailPokemon?.extendedProps.habitat.name as string} />

                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Details
