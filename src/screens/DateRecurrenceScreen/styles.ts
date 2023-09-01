import { StyleSheet } from "react-native";
import { scaleVertical } from "../../services/utils/Utils";

export default StyleSheet.create({
    header: {
        paddingHorizontal: scaleVertical(20),
        paddingTop: scaleVertical(20),
        paddingBottom: scaleVertical(8),
    },
    title: {
        width: '70%',
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
})