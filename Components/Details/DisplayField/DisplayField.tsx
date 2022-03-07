import * as React from "react";
import {View, Text} from "react-native";
import {IDisplayField} from "./Interfaces";

/**
 * Component qui affiche le champ de detail dans l'écran de details
 * @param props
 * @constructor
 */
const DisplayField = (props: IDisplayField) => {

    return (
        <>
            <View style={{
                alignItems: "flex-start",
            }}>
                <Text
                    style={{
                        textTransform: "capitalize",
                        fontSize: 16,
                        fontWeight: "bold"
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