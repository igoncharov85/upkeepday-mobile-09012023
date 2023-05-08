import { StyleSheet } from "react-native";



export default StyleSheet.create({
    container: {
        marginTop: 12
    },
    containerInput: {
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
    label: {
        color: 'rgba(109, 123, 152,0.5)',
        fontSize: 14,
        lineHeight: 19,
        marginBottom: 10
    },

    placeHolderText: {
        color: 'black',
        opacity: 0.5,
        fontSize: 14,
    },
    valueText: {
        color: '#171930',
        fontSize: 14,
        lineHeight: 19
    },

    iconWrapper: {
        position: 'absolute',
        right: 0,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    valueFieldWrapper: {
        height: 45,
        width: '100%',
        position: 'relative',
        justifyContent: 'center'

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
})