import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        overflow: "hidden",
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    header: {
        width: "100%"
    },
    text: { fontWeight: "bold", textTransform: "capitalize"},
    buttonBack : {
        margin: "auto",
        marginBottom: "10px",
        width: "100%"
    },
    userNameFormat:{
        width: "100%",
        fontWeight: "bold",
        fontSize: "20px",
        textAlign: "center",
        marginBottom: "20px"
    },
    pokemonList: {
        width: "100%"
    },
    loader: {
        height: "100%"
    }
})

export default styles