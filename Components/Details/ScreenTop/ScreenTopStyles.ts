import {StyleSheet} from "react-native";

const ScreenTopStyles = StyleSheet.create({
    outer: {
        width: "90%",
        height: 320,
        marginBottom: 50,
        backgroundColor: "#dd6b4d",
        borderRadius: 20,
        position: "relative"
    },
    btn: {
        position: "absolute",
        top: "85%",
        left: 80,
        height: 35,
        width: 35,
        borderRadius: 100,
        backgroundColor: "#dc0a2d"
    },
    inner: {
        position: "absolute",
        top: 25,
        left: 25,
        height: "70%",
        width: "90%",
        borderRadius: 20,
        margin: "auto",
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    lines: {
        position: "absolute",
        top: "85%",
        right: 50,
        width: 100,
        height: 100
    },
    t: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        transform: [{ rotate: "270deg" }],
        backgroundColor: "white",
        borderStyle: "solid",
        borderRightWidth: 50,
        borderTopWidth: 50,
        borderRightColor: "#dd6b4d",
        borderTopColor: "white",
    }
})

export default ScreenTopStyles