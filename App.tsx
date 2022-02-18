import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'
import Home from "./Components/Home/Home";
import Dex from "./Components/Dex/Dex";
import Details from './Components/Details/Details'
import {IPokemon} from "./Components/Interfaces/Interfaces";
import ContextComponent from "./Components/Context/MainContext";

export type RootParamList = {
    Home: undefined
    PokeDex: { userName: string }
    Details: { pokemon: IPokemon }
}

const Root = createStackNavigator<RootParamList>()
const App = () => {
    return (
        <ContextComponent>
            <NavigationContainer>
                <Root.Navigator initialRouteName={"Home"}>
                    <Root.Screen name="Home" component={Home} options={{ headerShown: false}}/>
                    <Root.Screen name="PokeDex" component={Dex} options={{ headerShown: false }}/>
                    <Root.Screen name="Details" component={Details} options={{ headerShown: false }} />
                </Root.Navigator>
            </NavigationContainer>
        </ContextComponent>

    );
}

export default App