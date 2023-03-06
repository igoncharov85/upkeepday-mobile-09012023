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
})