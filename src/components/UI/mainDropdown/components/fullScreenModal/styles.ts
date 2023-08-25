import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            margin: 0,
        },
        header: {
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 30,
        },
        radioButtonsWrapper: {
            flex: 1,
            borderTopWidth: 1,
            borderTopColor: '#A0A1AA',
        },
        button: {
            width: undefined,
            margin: 20
        },
    });
    return styles;
}
