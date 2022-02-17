import * as React from "react";
import {StyleProp, Text, TextStyle, View} from "react-native";

interface IDisplayField {
    styles?: StyleProp<TextStyle>
    title: string
    field: string | number
}
const DisplayField = (props: IDisplayField) => {

    return (
        <>
            <View style={{
                alignItems: "flex-start",
            }}>
                <Text
                    style={{
                        textTransform: "capitalize",
                        fontSize: 16
                    }}
                >{props.title} </Text>
            </View>
            <View style={{
                width: "100%",
                alignItems: "center",
            }}>
                <Text style={props.styles ?? {
                    width: "100%",
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: 10,
                    paddingTop: 15,
                    paddingBottom: 15,
                    backgroundColor: "#dd6b4d",
                    color: "white",
                    borderRadius: 5,
                    borderWidth: 1,
                    textTransform: "capitalize"
                }}>{props.field}</Text>
            </View>
        </>
    )
}

export default DisplayField