import { StyleSheet } from 'react-native';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        contentContainerStyle: {
            flexGrow: 1
        },
    });
    return styles;
};