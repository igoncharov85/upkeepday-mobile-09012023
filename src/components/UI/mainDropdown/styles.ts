import { StyleSheet } from 'react-native';
import { scaleHorizontal, scaleVertical, scaleFontSize } from '../../../services/utils/Utils';

export const getStyle = () => {
    const styles = StyleSheet.create({
        container: {
            overflow: 'visible',
        },
        title: {
            fontSize: 12,
            fontWeight: '300',
            marginBottom: 5,
            paddingLeft: 10,
            textTransform: 'capitalize'
        },
        button: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            height: scaleVertical(50),
            borderRadius: 8,
            paddingHorizontal: scaleHorizontal(23),
            backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
        },
        dropdown: {
            height: scaleVertical(50),
            borderRadius: 8,
            paddingHorizontal: scaleHorizontal(23),
            backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
        },
        dropdownList: {
            borderRadius: 12,
            marginBottom: scaleVertical(15),
            paddingVertical: scaleVertical(5),
        },
        icon: {
            marginRight: 5,
        },
        itemContainer: {
            paddingHorizontal: scaleVertical(15),
            paddingVertical: scaleVertical(5),
        },
        selectedItemContainer: {
            paddingHorizontal: scaleVertical(15),
            paddingVertical: scaleVertical(5),
        },
        itemText: {
            flex: 1,
            fontFamily: undefined,
            fontSize: scaleFontSize(14),
            color: '#171930',
        },
        label: {
            position: 'absolute',
            backgroundColor: 'white',
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
        },
        placeholderStyle: {
            fontSize: 16,
            color: '#171930'
        },
        text: {
            fontFamily: undefined,
            fontSize: scaleFontSize(14),
            color: '#171930'
        },
        inputSearchStyle: {
            width: scaleHorizontal(300),
            alignSelf: 'center',
        },
    });
    return styles;
}
