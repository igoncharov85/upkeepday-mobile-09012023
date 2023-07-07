import { StyleSheet } from "react-native";
import { ColorEnum } from "../../../common/constants/styles/colors.enum";

export default StyleSheet.create({
 
    container: {
        position: 'relative',
        backgroundColor: ColorEnum.ACCENT_BC,
        paddingTop: 10,
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },
    scroll: {
        width: '100%',
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
    },
    forgotPasswordText: {
        color: ColorEnum.BLACK,
        fontWeight: '300',
        fontSize: 14,
        textDecorationLine: 'underline',
        opacity: 0.7,
    },
    footerWrapper: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20,
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