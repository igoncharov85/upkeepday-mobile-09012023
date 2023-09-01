import { StyleSheet } from "react-native";
import { IColors } from "../../UIProvider/theme/IColors";
import { scaleHorizontal, scaleFontSize } from "../../services/utils/Utils";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            padding: scaleHorizontal(20),
            backgroundColor: colors.card,
        },
        buttonWrapper: {
            marginTop: 60,
        },
        block: {
            marginBottom: 1,
            height: 52,
            justifyContent: "center",
            backgroundColor: "#fff",
            shadowColor: "#000",
            paddingHorizontal: 10,
            shadowOpacity: 0.22,
            shadowRadius: 6,
            borderRadius: 8,
            shadowOffset: {
                width: 0,
                height: 1
            },
            elevation: 2
        },
        header: {
            padding: scaleHorizontal(20),
            backgroundColor: colors.card,
        },
        text: {
            fontSize: scaleFontSize(18),
            fontWeight: '300',
            color: colors.text,
        },
        button: {
            overflow: 'visible',
            flexDirection: 'row',
            justifyContent: 'space-between',
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