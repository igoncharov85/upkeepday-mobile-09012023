import { StyleSheet } from "react-native";



export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    buttonWrapper: {
        marginTop: 60,
    },
    block: {
        marginBottom: 1,
        height: 52,
        justifyContent: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        paddingHorizontal: 10,
        shadowOpacity: 0.22,
        shadowRadius: 6,
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 1
        },
        elevation: 2
    }
})