import { StyleSheet } from "react-native";
import { scaleFontSize, scaleVertical } from "../../../../services/utils/Utils";
import { IColors } from "../../../../UIProvider/theme/IColors";

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            height: scaleVertical(60),
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            minHeight: 34,
        },
        headerText: {
            color: colors.title,
            fontWeight: '700',
            fontSize: scaleFontSize(24),
            textAlign: 'left',
        },
    });
    return styles;
};