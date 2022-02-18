import {View} from "react-native";
import {ChangeEvent, useContext, useState} from "react";
import {mainContext} from "../../Context/TranslateContext";
import {ITranslateContext, ITranslations} from "../../Interfaces/SharedInterfaces";
import {IDropdown} from "./Interfaces";

const Dropdown = (props: IDropdown) => {
    const context = useContext<ITranslateContext>(mainContext)

    const [, setLang] = useState<string>("en")
    const onChangeLang = (e: ChangeEvent<HTMLSelectElement>) => {
        setLang(e.target.value)
        context.setMessages(e.target.value as keyof ITranslations)
    }

    return (
        <View style={{alignItems: "flex-end", width: "100%"}}>
            <select style={{
                width: "30%",
                margin: 10,
                borderColor: "salmon",
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                position: "relative"
            }} name={"lang"} id={"lang"} onChange={onChangeLang}>
                {props.items.map((item: string) => {
                    return <option key={item} style={{
                        position: "absolute"
                    }} value={item.trim()}>{item.trim()}</option>
                })}
            </select>
        </View>
    )
}

export default Dropdown