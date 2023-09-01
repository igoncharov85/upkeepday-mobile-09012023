import { StyleSheet } from "react-native";
import { IColors } from "../../../UIProvider/theme/IColors";
import { scaleVertical } from "../../../services/utils/Utils";

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        modalWrapper: { position: 'absolute', height: '100%', width: '100%', zIndex: 100, },
        container: {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: scaleVertical(20),
        },
        content: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
        item: {
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 12,
            width: '100%',
            padding: 16,

        },
        link: {
            flexDirection: 'row',
        },
        linkItem: {
            marginRight: 8
        },
        payment: {
            flexDirection: 'row',
        },
        paymentItem: {
            marginRight: 8,
            paddingTop: 4
        },
        title: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 14,
            lineHeight: 19,
            color: '#171930',
            marginBottom: 8,
        },
        underlineText: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 19,
            textDecorationLine: 'underline',
            color: '#36385A',
            marginBottom: 8,
        },
        text: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 19,
            color: '#36385A',
            marginBottom: 8,
        },
        cancel: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
            marginTop: 16
        },
        backButton: {
            marginTop: 10,
            backgroundColor: colors.error
        }
    })
}