import * as React from "react";
import {createNavigationContainerRef, NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'
import Home from "./Components/Home/Home";
import Dex from "./Components/Dex/Dex";
import Details from './Components/Details/Details'
import {IPokemon} from "./Components/Interfaces/SharedInterfaces";
import ContextComponent from "./Components/Context/TranslateContext";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import {navigationRef} from "./Components/Navigation/Navigation";
import 'react-native-gesture-handler';
import {AppRegistry} from "react-native";

export type RootParamList = {
    Home: undefined
    Error: undefined
    PokeDex: { userName: string }
    Details: { pokemon: IPokemon }
}

const Root = createStackNavigator<RootParamList>()
const App = () => {
    return (
        <ContextComponent>
            <NavigationContainer ref={navigationRef}>
                <Root.Navigator initialRouteName={"Home"}>
                    <Root.Screen name="Home" component={Home} options={{ headerShown: false}}/>
                    <Root.Screen name="PokeDex" component={Dex} options={{ headerShown: false }}/>
                    <Root.Screen name="Details" component={Details} options={{ headerShown: false }} />
                    {/*<Root.Screen name="Error" component={ErrorPage} options={{ headerShown: false }} />*/}
                </Root.Navigator>
            </NavigationContainer>
        </ContextComponent>

    );
}

AppRegistry.registerComponent('main', () => App);
export default App
