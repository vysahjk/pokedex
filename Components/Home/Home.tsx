import * as React from 'react'
import {useContext, useEffect, useState} from "react";
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {BehaviorSubject} from 'rxjs'
import {RootParamList} from "../../App";
import {filter} from 'rxjs/operators'
import useNavigation from "../Navigation/Navigation";
import PokeBall from "./PokeBall/PokeBall";
import logo from '../../assets/logo.png'
import styles from './HomeStyles'
import Dropdown from "./Dropdown/Dropdown";
import {mainContext} from "../Context/TranslateContext";
import {translations} from "../translations";
import {ITranslateContext, ITranslations} from "../Interfaces/SharedInterfaces";

type HomeProps = StackScreenProps<RootParamList, 'Home'>

// Observable pour le nom
// On accept un nom d'au moins 3 charactères
const nameSubject = new BehaviorSubject<string>("")
const nameObservable = nameSubject.pipe(
    filter(val => val.trim().length >= 3 )
)

/**
 * Component principal
 * Affiche input pour le nom de l'utilisateur et button start
 * @param navigation
 * @constructor
 */
const Home = ({navigation}: HomeProps) => {
    const context = useContext<ITranslateContext>(mainContext)

    // Navigation
    const {goTo} = useNavigation()
    const goToDesk = () => {
        goTo(navigation, "PokeDex", {userName: context.userName })
    }

    // Logic use name
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
        context.setUserName(name)
    }

    return (
        <View style={styles.container}>
            <Dropdown items={["en", "fr", "it", "es"]} />
            <View style={styles.header}>
                <Image
                    source={logo}
                    style={styles.ImageLogo}
                />
                <Text style={{margin: 20, fontSize: 16}}>{context.translation('Welcome')}</Text>
                <TextInput
                    style={styles.InputText}
                    onChangeText={onChangeName}
                    placeholder={context.translation('LabelInputName')}/>
            </View>

            <PokeBall />

            <View style={{marginBottom: 20, width: 200}}>
                <TouchableOpacity
                    style={{
                        height: 50,
                        backgroundColor: startDisabled? "#fff": "#D25B70",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                    }}
                    disabled={startDisabled}
                    onPress={goToDesk}><Text style={{color: startDisabled? "#000": "#fff"}}>{context.translation('Start')}</Text></TouchableOpacity>
            </View>
        </View>)
}

export default Home;
