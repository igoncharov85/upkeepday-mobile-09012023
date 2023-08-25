import { StyleSheet } from 'react-native';
import { scaleFontSize, scaleHorizontal, scaleLineHeight } from '../../../../../../services/utils/Utils';
import { IColors } from '../../../../../../UIProvider/theme/IColors';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        titleWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            color: colors.title,
            fontSize: scaleFontSize(24),
            lineHeight: scaleLineHeight(30),
            fontWeight: '700',
            marginRight: scaleHorizontal(7),
        },
        editButton: {
            padding: scaleHorizontal(5),
        },
    });
    return styles;
}
