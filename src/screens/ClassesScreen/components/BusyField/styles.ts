import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        height: 100,
        width: 100,
        position: 'absolute',
        top: -20,
        left: -60,
    },
    wrapper: {
        position: 'absolute',
        height: 62,
        width: 46,
        overflow: 'hidden',
        borderRadius: 4,
    },
    line: {
        width: '200%',
        height: 1,
        backgroundColor: '#000',
        marginBottom: 5,
        transform: [{ rotate: '-30deg' }],
    }
});