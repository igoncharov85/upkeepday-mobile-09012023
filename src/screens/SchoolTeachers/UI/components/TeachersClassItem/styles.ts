import { StyleSheet } from "react-native";
import { IColors } from "../../../../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleFontSize, scaleVertical } from "../../../../../services/utils/Utils";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingHorizontal: scaleHorizontal(40),
            paddingVertical: scaleHorizontal(10),
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        title: {
            fontFamily: undefined,
            fontSize: scaleFontSize(16),
            fontWeight:'600',
            color: colors.text,
        },
        detailsWrapper: {
            height: scaleVertical(45),
            justifyContent:'space-between'
        },
        text: {
            fontFamily: undefined,
            fontSize: scaleFontSize(12),
            fontWeight:'600',
            color: colors.text,
        },
    });
};