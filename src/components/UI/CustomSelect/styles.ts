import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: 'white',
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
    },
    valueFieldWrapper: {
        height: 45,
        width: '100%',
        position: 'relative',
        justifyContent: 'center'

    },
    valueText: {
        color: 'black',
        fontSize: 14,
    },
    itemText: {
        color: 'black',
        fontSize: 14,
    },
    placeHolderText: {
        color: 'black',
        opacity: 0.5,
        fontSize: 14,
    },
    iconWrapper: {
        position: 'absolute',
        right: 0,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectItemsWrapper: {
        maxHeight: 100,
    },
    valueWrapper: {
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        paddingHorizontal: 0,
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingVertical: 7,
        borderBottomColor: 'black',
        borderBottomWidth: 0.3,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    labelText: {
        fontSize: 12,
        fontWeight: '300',
        marginBottom: 5,
        paddingLeft: 10,
        textTransform: 'capitalize'
    },
})