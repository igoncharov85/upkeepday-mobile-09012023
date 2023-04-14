import { StyleSheet } from "react-native";



export default StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'space-between',
        flex: 1,
        height: '200%'
    },
    interactive: {
        width: '100%',
        marginTop: 8,
        height: 52,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        paddingHorizontal: 10,
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        color: 'black',
    },
    label: {
        color: 'rgba(109, 123, 152,0.5)',
        fontSize: 14,
        lineHeight: 19,
        marginBottom: 6
    }
})