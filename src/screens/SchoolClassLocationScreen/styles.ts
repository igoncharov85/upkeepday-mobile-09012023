import { StyleSheet } from "react-native";
import { scaleHorizontal, scaleVertical } from "../../services/utils/Utils";

export const getStyles = () => {
    return StyleSheet.create({
        container: {
            padding: scaleVertical(20),
        },
        header: {
            paddingBottom: scaleHorizontal(20),
        },
        formWrapper: {
            flex: 1,
        },
    });
};