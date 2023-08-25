import { StyleSheet } from "react-native";
import { scaleFontSize, scaleHorizontal, scaleVertical } from "../../services/utils/Utils";

export const getStyles = () => {
    return StyleSheet.create({
        container: {
            flex: 1
        },
        screenContainer: {
            justifyContent: 'space-between',
        },
        backgroundImage: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        infoWrapper: {
            alignItems: 'center',
            height: scaleVertical(220),
            borderRadius: 11,
            backgroundColor: '#FFFFFF',
            paddingVertical: scaleVertical(16),
            marginTop: scaleVertical(140),
            marginHorizontal: scaleHorizontal(20),
        },
        title: {
            fontSize: scaleFontSize(14),
            fontWeight: '800',
            color: '#171930',
            marginBottom: scaleVertical(15),
        },
        textWrapper: {
            width: scaleVertical(150),
        },
        text: {
            fontSize: scaleFontSize(12),
            color: '#171930',
            marginBottom: scaleVertical(10),
        },
        buttonsWrapper: {
            margin: scaleHorizontal(20)
        },
        button: {
            marginBottom: scaleVertical(13),
        },
        backButton: {
            backgroundColor: '#C46B6C'
        },
    });
};