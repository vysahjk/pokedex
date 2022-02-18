import {StyleProp, TextStyle} from "react-native";

export interface IDisplayField {
    styles?: StyleProp<TextStyle>
    title: string
    field: string | number
}