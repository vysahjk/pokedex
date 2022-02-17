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
    ImageLogo: {width: "100%", marginTop: "15px", height: "100px", resizeMode: "center"},
    InputText: {
        width: "100%",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        padding: "10px",
        marginBottom: "10px",
        textAlign: "center"
    },
    title: {
        margin: "20px"
    },
    buttonStart: {
        marginBottom: "100px"
    }
})

export default styles
