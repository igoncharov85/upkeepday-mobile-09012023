import { StyleSheet } from "react-native";


export default StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        shadowOffset: {
            width: 0,
            height: 1
        },
        elevation: 10,
        shadowRadius: 6,
        marginBottom: 20,

    },
    part: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    partTop: {
        paddingBottom: 28
    },
    link: {
        flexDirection: 'row',
    },
    linkItem: {
        marginRight: 8
    },
    payment: {
        flexDirection: 'row',
    },
    paymentItem: {
        marginRight: 8,
        paddingTop: 4
    },
    title: {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 19,
        color: '#171930',
        marginBottom: 8,
    },
    underlineText: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 19,
        textDecorationLine: 'underline',
        color: '#36385A',
        marginBottom: 8,
    },
    text: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 19,
        color: '#36385A',
        marginBottom: 8,
    },
    textRight: {
        textAlign: 'right'
    },
    buttonIcon: {
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 4,
        paddingLeft: 1,
        paddingTop: 2
    }
})
