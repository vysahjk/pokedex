import {View, Text, Image, TouchableOpacity} from "react-native";
import logo from '../../assets/logo.png'
import styles from "../Home/HomeStyles";
import * as React from "react";
import {useContext} from "react";
import {ITranslateContext} from "../Interfaces/SharedInterfaces";
import {mainContext} from "../Context/TranslateContext";
import useNavigation from "../Navigation/Navigation";

const ErrorPage = () => {
    const context = useContext<ITranslateContext>(mainContext)
    const navigation = useNavigation()
    const goToHome = () => {
        navigation.goTo(null, "Home", {})
    }

    return (
        <View>
            <Image
                source={logo}
                style={styles.ImageLogo}
            />
            <Text style={{
                margin: 'auto',
                textAlign: "center",
                marginTop: 50
            }}>{context.translation("ErrorMessage")}</Text>

            <View style={{margin: "auto", marginTop: 50}}>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        height: 50,
                        backgroundColor: "#D25B70",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}
                    onPress={goToHome}><Text style={{color: "white"}}>{context.translation('GoToHome')}</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default ErrorPage
