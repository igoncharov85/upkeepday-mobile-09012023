import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: '#EAEAF2',
        borderRadius: 5,
        paddingLeft: 40,
        width: '100%',
        color: '#171930',
        fontSize: 12,
        lineHeight: 18,
        paddingHorizontal: 20,
        marginBottom: 16,
        height: 44
    },
    student: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        height: 64,
    },
    studentName: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 19,
        color: '#171930',
    },
    decorationLine: {
        width: '150%',
        marginLeft: -40,
        height: 1,
        backgroundColor: '#BAC2CB',
    }
})