import { StyleSheet } from "react-native";
import { ColorEnum } from "../../common/constants/styles/colors.enum";

export default StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: ColorEnum.ACCENT_BC,
        paddingTop: 20,
        flex: 1,
        height: '100%',
        alignItems: 'center'
    },
    formWrapper: {
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        marginHorizontal: 15,
    },
    inputWrapper: {
        marginVertical: 15,
        width: '90%',
    },
    buttonWrapper: {
        paddingTop: 20,
        width: '90%'
    },
})