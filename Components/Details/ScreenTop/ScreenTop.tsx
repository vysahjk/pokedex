import * as React from "react";
import {Image, ImageBackground, View} from "react-native";
import garden from '../../../assets/garden.png'
import styles from './ScreenTopStyles'

const screenTop = (gif: string) => {
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
                <View style={{
                    height: 5,
                    marginBottom: 5,
                    backgroundColor: "black"
                }} />
                <View style={{
                    height: 5,
                    marginBottom: 5,
                    backgroundColor: "black"
                }} />
                <View style={{
                    height: 5,
                    marginBottom: 5,
                    backgroundColor: "black"
                }} />
            </View>
            <View style={styles.t} />
        </View>
    )
}

export default screenTop