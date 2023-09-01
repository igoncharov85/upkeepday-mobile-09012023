import { StyleSheet } from "react-native";

export const getStyles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        list: {
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
        loader: {
            marginTop: 80
        }
    });
};
