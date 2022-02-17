import * as React from "react";
import {View} from "react-native";
import styles from "./PokeBallStyles";

const PokeBall = () => {
    return (
        <View style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <View style={styles.dotBackTransparent}>
                <View style={styles.dotTop}>
                    <View style={styles.lineCenterTop} />
                </View>
                <View style={styles.dotBottom}>
                    <View style={styles.lineCenterBottom} />
                </View>
            </View>

            <View style={styles.dotCenter1} />
            <View style={styles.dotCenter2} />
        </View>
    )
}

export default PokeBall