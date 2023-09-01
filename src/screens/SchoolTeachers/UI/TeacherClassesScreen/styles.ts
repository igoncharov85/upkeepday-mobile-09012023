import { StyleSheet } from "react-native";
import { scaleHorizontal, scaleVertical } from "../../../../services/utils/Utils";
import { IColors } from "../../../../UIProvider/theme/IColors";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        header: {
            padding: scaleHorizontal(20),
        },
        search: {
            marginHorizontal: scaleHorizontal(35)
        },
        list: {
            borderTopWidth: 1,
            borderTopColor: colors.border,
            marginTop: scaleVertical(14),
            paddingBottom: scaleVertical(20),
        }
    });
};