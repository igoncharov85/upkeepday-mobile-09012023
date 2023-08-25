import { StyleSheet } from 'react-native';
import { scaleHorizontal, scaleVertical } from '../../../services/utils/Utils';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            zIndex: 1,
            height: scaleVertical(50),
            marginHorizontal: scaleHorizontal(20),
            overflow: 'visible',
        },
        inputContainer: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#EAEAF1',
            paddingRight: scaleHorizontal(15),
            borderRadius: 8,
        },
        searchContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: scaleHorizontal(50),
            width: scaleHorizontal(50),
        },
        input: {
            flex: 1,
        },
    });
    return styles;
}
