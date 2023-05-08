import { StyleSheet } from "react-native";
import { ColorEnum } from "../../common/constants/styles/colors.enum";

export default StyleSheet.create({

    container: {
        position: 'relative',
        backgroundColor: ColorEnum.ACCENT_BC,
        paddingTop: 10,
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    contentWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    formWrapper: {
        alignItems: 'center',
        width: '100%',
        marginHorizontal: 20,
    },
    inputWrapper: {
        marginVertical: 10,
        width: '90%',
    },
    buttonWrapper: {
        paddingTop: 20,
        width: '90%'
    },
    forgotPassword: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        textAlign: 'right',
        marginTop: 10,
    },
    forgotPasswordText: {
        color: ColorEnum.BLACK,
        fontWeight: '300',
        fontSize: 14,
        textDecorationLine: 'underline',
        opacity: 0.7,
    },
    footerWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        color: ColorEnum.BLACK,
        fontWeight: '300',
        fontSize: 15,
        textDecorationLine: 'underline',
        opacity: 0.7,
    },
    imgWrapper: {
        paddingVertical: 10,
    }
})