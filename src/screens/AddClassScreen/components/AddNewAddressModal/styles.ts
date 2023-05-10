import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default StyleSheet.create({
    addressItem: {
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 20,
    },
    textAddress: {
        fontSize: 15,
        lineHeight: 18,
        textAlign: 'center',
        color: '#9A99A2'
    },
    active: {
        color: '#232326',
    },
    rowInput: {
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',

    },
    inputSplitted: {
        marginVertical: 10,
        width: '47%',
    },
    label: {
        color: 'rgba(109, 123, 152,0.5)',
        fontSize: 14,
        lineHeight: 19,
        marginBottom: -10
    }
})