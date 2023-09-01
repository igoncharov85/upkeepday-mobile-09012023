import { StyleSheet } from "react-native";
import { scaleFontSize, scaleHorizontal, scaleVertical } from "../../../../services/utils/Utils";
import { IColors } from "../../../../UIProvider/theme/IColors";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
        },
        header: {
            padding: scaleHorizontal(20),
            justifyContent: 'space-between',
        },
        search: {
            marginHorizontal: scaleHorizontal(30),
            marginBottom: scaleVertical(15),
        },
        studentContainer: {
            paddingHorizontal: scaleHorizontal(40),
        },
        list: {
            borderTopWidth: 1,
            borderColor: colors.border,
        }
    });
};



