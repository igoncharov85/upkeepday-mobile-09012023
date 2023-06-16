import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    buttonWrapper: {
        flexDirection: 'row',
        width: '100%',
        height: 28,
        backgroundColor: 'rgba(109,123,152,0.2)',
        borderRadius: 9,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flex: 1,
        background: '#A5AFC4',
        borderRadius: 9,
    },
    buttonLinearGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',

        borderRadius: 9,
    },
    button_active: {
        backgroundColor: 'none',
    },
    buttonText: {
        color: '#171930',
    },
    buttonText_active: {
        color: '#fff',
    },
});
