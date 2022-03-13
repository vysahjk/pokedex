import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    header: {
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#6CB3A9",
        justifyContent: "space-between",
        alignItems: "center",
    },
    div: {display: "flex", justifyContent: "center", alignContent: "center"},
    ImageLogo: {width: "100%", marginTop: 15, height: 100, resizeMode: "center"},
    InputText: {
        width: "100%",
        backgroundColor: "#fff",
        borderColor: "#000",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        textAlign: "center"
    },
    title: {
        margin: 20
    },
    buttonStart: {
        marginBottom: 100
    }
})

export default styles
