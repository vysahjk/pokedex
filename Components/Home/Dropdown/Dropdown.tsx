import {View} from "react-native";
import {ChangeEvent, useContext, useState} from "react";
import {mainContext} from "../../Context/TranslateContext";
import {ITranslateContext, ITranslations} from "../../Interfaces/SharedInterfaces";
import {IDropdown} from "./Interfaces";
import SelectDropdown from 'react-native-select-dropdown'

/**
 * Dropdown pour gérer les traductions dans l'écran principale
 * @param props
 * @constructor
 */
const Dropdown = (props: IDropdown) => {
    const context = useContext<ITranslateContext>(mainContext)

    const [, setLang] = useState<string>("en")
    const onChangeLang = (e: string) => {
        setLang(e)
        context.setMessages(e as keyof ITranslations)
    }

    return (
        <View style={{marginTop: 30, alignItems: "center", width: "100%"}}>
            <SelectDropdown
                data={props.items.map((item: string | keyof ITranslations) => item)}
                onSelect={onChangeLang}
                rowTextForSelection={(item: string, index: number) => context.translation( `${item as keyof ITranslations}`)}
                buttonTextAfterSelection={(item: string, index: number) => context.translation( `${item as keyof ITranslations}`)}
            />
        </View>
    )
}

export default Dropdown
