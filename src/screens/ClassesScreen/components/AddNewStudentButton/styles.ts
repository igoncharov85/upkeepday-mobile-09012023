import { StyleSheet } from "react-native";
import { scaleFontSize, scaleHorizontal, scaleVertical } from "../../../../services/utils/Utils";
import { IColors } from "../../../../UIProvider/theme/IColors";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: scaleVertical(24),
            marginHorizontal: scaleHorizontal(30),
        },
        text: {
            fontSize: scaleFontSize(16),
            fontWeight: '600',
            color: colors.text,
        },
    });
};



