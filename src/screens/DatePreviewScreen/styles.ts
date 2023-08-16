import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 8
    },
    title: {
        fontSize: 14,
        lineHeight: 19,
        color: 'rgba(23, 25, 48, 0.4)',
        textAlign: 'center',
        marginBottom: 24
    },
    daysOfWeekText: {
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 19,
        color: '#171930',
        opacity: 0.4,
    },
    textConflict: { marginLeft: 4, fontSize: 12, lineHeight: 19, color: '#F4380E' },
    arrowBtn: { height: 24, width: 40, },
    conflictContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8 }
})