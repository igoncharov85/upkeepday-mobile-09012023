import { StyleSheet } from "react-native";
import { IColors } from "../../../../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleFontSize, scaleVertical } from "../../../../../services/utils/Utils";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.card,
            padding: scaleHorizontal(20),
            marginBottom: scaleVertical(20),
            borderRadius: 10,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
        },
        topWrapper: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        name: {
            fontFamily: undefined,
            fontSize: scaleFontSize(14),
            fontWeight: 'bold',
            color: colors.title,
        },
        text: {
            fontFamily: undefined,
            fontSize: scaleFontSize(12),
            color: colors.text,
            marginLeft: scaleHorizontal(4),
        },
        linedText:{
            fontFamily: undefined,
            fontSize: scaleFontSize(12),
            color: colors.text,
            textDecorationLine:'underline',
            marginLeft: scaleHorizontal(4),
        },
        contactWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scaleVertical(6),
        },
        infoWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scaleVertical(6),
        },
        title: {
            fontFamily: undefined,
            fontSize: scaleFontSize(12),
            fontWeight:'bold',
            color: colors.text,
        },
        buttonsWrapper: {
            flexDirection: 'row',
            marginTop: scaleVertical(20),
        },
        editButton: {
            marginRight: scaleHorizontal(10),
        }
    });
};