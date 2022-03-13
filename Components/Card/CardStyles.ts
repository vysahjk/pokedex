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
        height: 100,
        width: 100,
        position: "relative",
        flex: 1.3,
        alignItems: "flex-start",
    },
    pokemonNumber: {
        position: "absolute",
        top: 0,
        left: 0,
        marginLeft: 25,
        color: "#fff",
        fontWeight: "bold"
    },
    pokemonImage: {width: "100%"},
    innerPokemonImage: {margin: 10}
})

export default styles
