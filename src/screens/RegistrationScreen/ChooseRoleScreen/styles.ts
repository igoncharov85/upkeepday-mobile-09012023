import { StyleSheet } from "react-native";
import { ColorEnum } from "../../../common/constants/styles/colors.enum";


export default StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: ColorEnum.ACCENT_BC,
        paddingTop: 20,
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    headerSubTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: ColorEnum.BLACK,
        opacity: 0.7,
        textAlign: 'left'
    },
    subWrapper: {
        marginTop: 15,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 4,
    },
    cardText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '400',
        color: ColorEnum.BLACK,
    },
    cardWrapper: {
        height: 209,
        width: 325,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 4.65,

        elevation: 8,
    },
    cardContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: 25,
    },
    text: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '400',
        color: ColorEnum.BLACK,
        opacity: 0.6,
        textDecorationLine: 'underline'
    },
    row: {
        position: 'absolute',
        bottom: 20,
        width: '75%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    }
})