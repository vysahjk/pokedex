import * as React from 'react'
import {useEffect, useState} from "react";
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {BehaviorSubject} from 'rxjs'
import {RootParamList} from "../../App";
import {filter} from 'rxjs/operators'
import useNavigation from "../Navigation/Navigation";
import PokeBall from "./PokeBall/PokeBall";
import logo from '../../assets/logo.png'
import styles from './HomeStyles'

type HomeProps = StackScreenProps<RootParamList, 'Home'>
const nameSubject = new BehaviorSubject<string>("")
const nameObservable = nameSubject.pipe(
    filter(val => val.trim().length > 4)
)
const Home = ({navigation}: HomeProps) => {

    // Navigation
    const {goTo} = useNavigation()
    const goToDesk = () => {
        goTo(navigation, "PokeDex", {userName: name})
    }

    // Logic use name
    const [name, setName] = useState<string>("")
    const [startDisabled, setStartDisabled] = useState<boolean>(true)
    useEffect(() => {
        const subscription = nameObservable.subscribe(_ => {
            setStartDisabled(false)
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const onChangeName = (name: string) => {
        if (!name || name.length <= 4) setStartDisabled(true)
        nameSubject.next(name)
        setName(name)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={logo}
                    style={styles.ImageLogo}
                />
                <Text style={{margin: 20, fontSize: 16}}>Welcome to your new pokeDex</Text>
                <TextInput
                    style={styles.InputText}
                    onChangeText={onChangeName}
                    placeholder={"Please enter your name"}/>
            </View>

            <PokeBall />

            <View style={{marginBottom: "10%", width: 200}}>
                <TouchableOpacity
                    style={{
                        margin: "50px auto",
                        height: 50,
                        backgroundColor: startDisabled? "white": "#D25B70",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}
                    disabled={startDisabled}
                    onPress={goToDesk}><Text style={{color: startDisabled? "black": "white"}}>START</Text></TouchableOpacity>
            </View>
        </View>)
}

export default Home;