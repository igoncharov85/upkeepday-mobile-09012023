import { StyleSheet } from "react-native";
import { scaleHorizontal } from "../../services/utils/Utils";

export const getStyles = () => {
    return StyleSheet.create({
        container: {
            padding: scaleHorizontal(10),
            overflow:'visible',
        },
        header: {
            paddingBottom: scaleHorizontal(20),
        },
        formWrapper: {
            flex: 1,
            overflow: 'visible',
        },
    });
};