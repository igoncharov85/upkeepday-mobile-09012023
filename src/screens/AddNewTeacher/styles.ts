import { StyleSheet } from "react-native";
import { scaleHorizontal } from "../../services/utils/Utils";

export const getStyles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        header: {
            padding: scaleHorizontal(20),
        },
        formWrapper: {
            flex: 1,
            paddingHorizontal: scaleHorizontal(20),
        },
        input: {
            marginTop: 15,
        },
        button: {
            width: undefined,
            margin: scaleHorizontal(20),
        },
    });
};