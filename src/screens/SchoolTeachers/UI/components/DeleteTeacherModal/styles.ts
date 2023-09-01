import { StyleSheet } from "react-native";
import { IColors } from "../../../../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleFontSize, scaleVertical } from "../../../../../services/utils/Utils";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        modal: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: {
            alignSelf: 'center',
            width: scaleHorizontal(300),
            height: scaleVertical(170),
            marginTop: scaleVertical(250),
            borderRadius: 16,
            borderWidth: 6,
            borderColor: colors.secondaryBorder,
            backgroundColor: colors.card,
        },
        backgroundImage: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        text: {
            fontFamily: undefined,
            fontSize: scaleFontSize(20),
            fontWeight:'bold',
            textAlign:'center',
            color: colors.title,
            marginTop: scaleVertical(30),
            marginHorizontal: scaleHorizontal(11),
        },
        buttonsWrapper: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingHorizontal: scaleHorizontal(30),
            paddingBottom: scaleVertical(15),
        },
        button: {
            width: scaleHorizontal(100),
            height: scaleVertical(40),
            backgroundColor: colors.primarySecondary,
        }
    });
};