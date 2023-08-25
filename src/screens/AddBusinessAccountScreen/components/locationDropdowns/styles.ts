import { StyleSheet } from "react-native";
import { scaleHorizontal } from "../../../../services/utils/Utils";

export const getStyles = () => {
    return StyleSheet.create({
        container: {
            // flexDirection: 'row', TODO: research why dropdowns don't scroll when they in row
            overflow:'visible',
            marginTop: 10,
        },
        dropdownOffset: {
            marginBottom: scaleHorizontal(10),
        },
    });
};