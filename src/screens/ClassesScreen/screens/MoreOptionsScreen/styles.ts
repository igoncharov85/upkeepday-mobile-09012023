import { StyleSheet } from "react-native";
import { scaleFontSize, scaleHorizontal } from "../../../../services/utils/Utils";
import { IColors } from "../../../../UIProvider/theme/IColors";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            padding: scaleHorizontal(20),
            backgroundColor: colors.card,
        },
        header: {
            padding: scaleHorizontal(20),
            backgroundColor: colors.card,
        },
        text: {
            fontSize:scaleFontSize(18),
            fontWeight:'300',
            color: colors.text,
        },
        button: {
            overflow: 'visible',
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal: scaleHorizontal(15),
            backgroundColor: colors.card,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.50,
            shadowRadius: 6.68,
            elevation: 11,
        }
    });
};



