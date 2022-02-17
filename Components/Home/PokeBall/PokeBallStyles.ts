import {StyleSheet} from "react-native";

const pokeBallStyles = StyleSheet.create({

    lineCenterTop: {
        borderLeftWidth: 20,
        borderLeftColor: "#6CB3A9",
        borderRightWidth: 20,
        borderRightColor: "#6CB3A9",
        position: "absolute",
        left: 0,
        bottom: 0,
        width: 200,
        height: 10,
        transform: [
            { translateX: 0 }
        ],
        backgroundColor: "#781728"
    },
    lineCenterBottom: {
        borderLeftWidth: 20,
        borderLeftColor: "#6CB3A9",
        borderRightWidth: 20,
        borderRightColor: "#6CB3A9",
        position: "absolute",
        transform: [
            { translateX: 0 }
        ],
        left: 0,
        top: 0,
        width: 200,
        height: 10,
        backgroundColor: "#781728"
    },
    dotCenter1: {
        position: "absolute",
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#781728"
    },
    dotCenter2: {
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "#F6DF96"
    },
    dotBackTransparent: {
        width: 200,
        height: 200,
        backgroundColor: "#781728",
        borderRadius: 100,
        display: "flex",
        placeItems: "center",
        position: "relative",
    },
    dotBottom: {
        position: "absolute",
        top: 100,
        width: 200,
        height: "50%",
        backgroundColor: "white",
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200
    },
    dotTop: {
        position: "absolute",
        top: 0,
        width: 200,
        height: "50%",
        backgroundColor: "#D25B70",
        borderTopLeftRadius: 200,
        borderTopRightRadius: 200
    }
})

export default pokeBallStyles