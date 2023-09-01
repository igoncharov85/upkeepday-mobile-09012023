import { StyleSheet } from "react-native";
import { scaleVertical } from "../../services/utils/Utils";

export default StyleSheet.create({
    container: {
        padding: scaleVertical(20),
        justifyContent: 'space-between',
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
        marginTop: 8,
        color: 'rgba(109, 123, 152,0.5)',
        fontSize: 14,
        lineHeight: 19,
        marginBottom: 6
    }
})