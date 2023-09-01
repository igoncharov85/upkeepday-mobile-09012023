import { StyleSheet } from "react-native";
import { scaleFontSize, scaleHorizontal, scaleVertical } from "../../services/utils/Utils";
import { IColors } from "../../UIProvider/theme/IColors";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            height: '100%',
        },
        header: {
            paddingHorizontal: scaleHorizontal(20),
            paddingTop: scaleHorizontal(20),
            paddingBottom: scaleVertical(60),
        },
        linedButton: {
            borderBottomWidth: 1,
            borderBottomColor: colors.border
        },
        text: {
            fontSize: scaleFontSize(14),
            fontWeight: '400',
            color: colors.text
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
            borderTopColor: colors.border,
            marginTop: scaleVertical(15),
        },
        button: {
            width: undefined,
            margin: scaleHorizontal(20),
        },
    });
};