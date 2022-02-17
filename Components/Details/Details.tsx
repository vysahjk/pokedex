import * as React from "react";
import {View, Button} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {RootParamList} from "../../App";
import {useEffect, useState} from "react";
import {IPokemon} from "../Interfaces/Interfaces";
import {fetchPokemonBy} from "../Service/FetchPokemonBy";
import useNavigation from "../Navigation/Navigation";
import screenTop from "./ScreenTop/ScreenTop";
import DisplayField from "./DisplayField/DisplayField";

type DetailsProps = StackScreenProps<RootParamList, 'Details'>

const Details = ({route, navigation}: DetailsProps) => {
    const {goTo} = useNavigation()
    const goToPage = (page: string) => {
        goTo(navigation, page, {})
    }

    const [detailPokemon, setDetailPokemon] = useState<IPokemon | undefined>(undefined)
    useEffect(() => {
        (async () => {
            const {data: next} = await fetchPokemonBy("pokemon-species", route.params.pokemon.name)
            setDetailPokemon(route.params.pokemon.setExtendedProps(next as any))
        })()
    }, [])

    return (
        <View style={{
            height: "100%",
            overflow: "hidden",
            backgroundColor: "white",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <View style={{marginBottom: 10, width: "100%"}}>
                <Button
                    color={"#dd6b4d"}
                    title={"Go back to list"}
                    onPress={() => goToPage("PokeDex")}/>
            </View>

            {screenTop(detailPokemon?.sprites.versions.gif_default as string)}

            <View style={{width: "90%"}}>

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
                        color: "white",
                        borderRadius: 5,
                        borderWidth: 1,
                        textTransform: "capitalize"
                    }}
                    title={"Name:"}
                    field={detailPokemon?.name as string} />

                <DisplayField
                    styles={{
                        width: "100%",
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}
                    title={"Description:"}
                    field={detailPokemon?.extendedProps.description as string} />

                <DisplayField
                    title={"Happiness Rate:"}
                    field={detailPokemon?.extendedProps.base_happiness as number} />

                <DisplayField
                    title={"Habitat:"}
                    field={detailPokemon?.extendedProps.habitat.name as string} />

            </View>
        </View>
    )
}

export default Details