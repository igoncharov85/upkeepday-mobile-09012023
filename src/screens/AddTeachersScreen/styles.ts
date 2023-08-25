import { StyleSheet } from "react-native";
import { scaleFontSize, scaleHorizontal, scaleVertical } from "../../services/utils/Utils";

export const getStyles = () => {
    return StyleSheet.create({
        container: {
            height: '100%',
        },
        header: {
            padding: scaleHorizontal(20),
        },
        linedButton: {
            borderBottomWidth: 1,
            borderBottomColor: '#A0A1AA'
        },
        text: {
            fontSize: scaleFontSize(14),
            fontWeight: '400',
            color: '#A0A1AA'
        },
        addingButton: {
            width: scaleHorizontal(128),
            height: scaleHorizontal(38),
            marginBottom: scaleVertical(20),
            marginLeft: scaleHorizontal(20),
        },
        list: {
            flex: 1,
            borderTopWidth: 1,
            borderTopColor: '#BAC2CB',
            marginTop: scaleVertical(15),
        },
        button: {
            width: undefined,
            margin: scaleHorizontal(20),
        },
    });
};