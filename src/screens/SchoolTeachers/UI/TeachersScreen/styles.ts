import { StyleSheet } from "react-native";
import { scaleHorizontal } from "../../../../services/utils/Utils";

export const getStyles = () => {
    return StyleSheet.create({
        list: {
            padding: scaleHorizontal(20),
        }
    });
};