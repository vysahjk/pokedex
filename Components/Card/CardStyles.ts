import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        margin: 15,
        borderColor: "#d8d8d8",
        borderBottomWidth: 1
    },
    text: {
        fontWeight: "bold",
        textTransform: "capitalize"
    },
    cardImage: {
        position: "relative",
        flex: 1.2,
        alignItems: "flex-start"
    },
    pokemonNumber: {
        position: "absolute",
        top: 0,
        left: 0,
        marginLeft: 25,
        color: "white",
        fontWeight: "bold"
    },
    pokemonImage: {width: "100%"},
    innerPokemonImage: {margin: "auto"}
})

export default styles