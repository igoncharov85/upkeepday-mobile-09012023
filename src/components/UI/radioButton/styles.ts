import { StyleSheet } from "react-native";
import { scaleFontSize } from "../../../services/utils/Utils";

export const getStyles = () => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
            height: 62,
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#A0A1AA',
        },
        text: {
            fontSize: scaleFontSize(14),
            fontWeight: '400',
            color: '#A0A1AA'
        },
        checkBox: {
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            borderWidth: 1,
            borderColor: '#9A80BA',
        },
    });
};