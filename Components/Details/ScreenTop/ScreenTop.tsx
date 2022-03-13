import * as React from "react";
import {Image, ImageBackground, View} from "react-native";
import garden from '../../../assets/garden.png'
import styles from './ScreenTopStyles'

/**
 * Component qui affiche le gif d'un pokemon in component details
 * pure css
 * @param gif
 */
const ScreenTop = (gif: string) => {
    return (
        <View style={styles.outer}>
            <View style={styles.inner} >
                <ImageBackground style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-end",
                    paddingBottom: 10,
                    alignItems: "center"
                }} source={garden}>
                    <Image source={{
                        uri: gif,
                        height: 100,
                        width: 100
                    }}/>
                </ImageBackground>
            </View>
            <View style={styles.btn} />
            <View style={styles.lines}>
                <View style={styles.line} />
                <View style={styles.line} />
                <View style={styles.line} />
            </View>
        </View>
    )
}

export default ScreenTop
