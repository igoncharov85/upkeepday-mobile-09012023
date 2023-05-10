import { StyleSheet } from "react-native";
import { ColorEnum } from "../../../common/constants/styles/colors.enum";

export default StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: ColorEnum.ACCENT_BC
    },
    labelText: {
        fontSize: 12,
        fontWeight: '300',
        marginBottom: 5,
        paddingLeft: 10,
        textTransform: 'capitalize'
    },
    absoluteIcon: {
        top: 0,
        position: 'absolute',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
    },
    errorText: {
        textTransform: 'capitalize',
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    input: {
        position: 'relative',
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
        color: 'black'
    }
})