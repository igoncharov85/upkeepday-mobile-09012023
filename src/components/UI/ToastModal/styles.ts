import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: 55,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderWidth: 1,
        borderLeftWidth: 6,
        borderColor: 'yellow'
    },
    textHeader: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    toastText: {
        marginTop: 5,
        fontSize: 14,
        lineHeight: 18,
        color: 'grey'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    centered: {
        height: '100%',
        width: 40,

        alignItems: 'center',
        justifyContent: 'center',
    }
});
