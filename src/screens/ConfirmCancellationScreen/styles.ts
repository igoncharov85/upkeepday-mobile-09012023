

import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    finishBtn: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%'
    },
    containerItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 18,
        paddingTop: 6,
    },
    item: {
        backgroundColor: 'white',
        position: 'relative',
        width: '100%',
        borderColor: '#E2E2EA',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        overflow: 'hidden',
    },
    itemTrial: {
        height: 98,
    },
    itemLesson: {
        height: 69,
    },
    itemInfo: {
        marginLeft: 14,
        flexDirection: 'column',
    },
    decorItemLine: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        height: '100%',
        width: 4,
    },
    decorItemLineTrial: {
        backgroundColor: '#FF7F09',
    },
    decorItemLineLesson: {
        backgroundColor: '#9A80BA',
    },
    timeStart: {
        fontSize: 12,
        lineHeight: 18,
        color: '#171930',
        opacity: 0.4,
    },
    title: {
        marginTop: 12,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '700',
    },
    subtitle: {
        fontWeight: '600',
        fontSize: 15,
        width: '100%',
        marginTop: 32,
        textAlign: 'center'
    },
    sessionTitle: {
        fontWeight: '600',
        fontSize: 17,
        color: '#171930',
        width: '100%',
        marginTop: 32,
        marginBottom: 28,
        textAlign: 'center'
    },
    time: {
        marginTop: 8,
        fontSize: 14,
        lineHeight: 22,
        color: '#7E8CA0',
    },
})