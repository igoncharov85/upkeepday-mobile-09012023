import { StyleSheet } from "react-native";
import { scaleHorizontal, scaleVertical } from "../../../../services/utils/Utils";

export const getStyles = () => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(35),
            height: scaleVertical(62),
            borderBottomWidth: 1,
            borderBottomColor: '#BAC2CB',
        },
        text: {

        },
        buttonWrapper: {
            flex: 1,
            padding: 20,
            justifyContent: 'flex-end'
        },
    });
};