import { StyleSheet } from "react-native";
import { ColorEnum } from "../../../common/constants/styles/colors.enum";

export default StyleSheet.create({
    container: {
        backgroundColor: ColorEnum.ACCENT_BC,
        paddingTop: 20,
        paddingVertical: 20,
        width: '100%',
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
    rowInput: {
        justifyContent: 'space-between',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputSplitted: {
        marginVertical: 10,
        width: '47%',
    },
    text: {
        marginTop: 15,
        fontSize: 14,
        color: ColorEnum.BLACK,
        opacity: 0.7
    }
})