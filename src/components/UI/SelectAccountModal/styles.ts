import { StyleSheet } from "react-native";
import { scaleVertical, scaleHorizontal, scaleFontSize } from "../../../services/utils/Utils";
import { IColors } from "../../../UIProvider/theme/IColors";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        screenContainer: {
            backgroundColor: 'transparent',
            paddingHorizontal: scaleHorizontal(15),
            paddingVertical: scaleVertical(30),
        },
        backgroundImage: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        gradientWrapper: {
            flex: 1,
            borderRadius: 16,
            padding: scaleVertical(6),
        },
        infoWrapper: {
            flex: 1,
            borderRadius: 13,
            backgroundColor: '#FFFFFF',
            paddingVertical: scaleVertical(16),
        },
        title: {
            textAlign: 'center',
            fontSize: scaleFontSize(16),
            fontWeight: '800',
            color: colors.title,
            marginBottom: scaleVertical(15),
        },
        subTitle: {
            fontSize: scaleFontSize(16),
            fontWeight: '800',
            color: colors.title,
            marginLeft: scaleVertical(15),
            marginVertical: scaleVertical(35),
        },
        tutorWrapper: {
            justifyContent: 'center',
            height: scaleVertical(62),
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.border,
            paddingLeft: scaleHorizontal(13),
            marginTop: scaleVertical(55),
        },
        schoolWrapper: {
            justifyContent: 'center',
            height: scaleVertical(62),
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingLeft: scaleHorizontal(13),
        },
        text: {
            fontSize: scaleFontSize(14),
            color: colors.text,
        },
        list: {
            borderTopWidth: 1,
            borderTopColor: colors.border,
        }
    });
};