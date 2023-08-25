import { StyleSheet } from "react-native";
import { scaleFontSize } from "../../../services/utils/Utils";

export const getStyles = (disabled?: boolean) => {
    return StyleSheet.create({
        container: {
            borderBottomWidth: 1,
            borderBottomColor: disabled ? '#A0A1AA' : '#232326'
        },
        text: {
            fontSize: scaleFontSize(14),
            fontWeight: '400',
            color: disabled ? '#A0A1AA' : '#232326'
        },
    });
};