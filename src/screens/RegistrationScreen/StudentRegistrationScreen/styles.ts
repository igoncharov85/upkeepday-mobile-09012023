import { StyleSheet } from "react-native";
import { ColorEnum } from "../../../common/constants/styles/colors.enum";

export default StyleSheet.create({
    container: {
        backgroundColor: ColorEnum.ACCENT_BC,
        paddingTop: 10,
        paddingVertical: 10,
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
    pickerWrapper: {
        backgroundColor: 'white',
        height: 50,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        paddingHorizontal: 10,
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        color: 'black',
        alignItems: 'flex-start',
        justifyContent: 'center',
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