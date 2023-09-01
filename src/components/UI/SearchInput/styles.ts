import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    wrapper: { flex: 1, maxHeight: 43, },
    input: {
        backgroundColor: '#EAEAF2',
        borderRadius: 5,
        height: 43,
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginLeft: 10
    }
})