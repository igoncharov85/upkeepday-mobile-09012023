import { StyleSheet } from "react-native";

export const getStyles = () => {
    return StyleSheet.create({
        container: {
            height: '100%',
        },
        header: {
            padding: 20,
        },
        formWrapper: {
            paddingHorizontal: 20,
        },
        input: {
            marginTop: 10
        },
        countryStateWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
        },
        buttonWrapper: {
            flex: 1,
            padding: 20,
            justifyContent: 'flex-end'
        },
    });
};