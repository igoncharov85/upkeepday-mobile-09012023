import React, { FC, ReactNode, memo } from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import BackIcon from '../../../assets/svg/BackIcon';
import { StyleEnum } from '../../common/constants/styles/styles.enum';
import styles from './styles';

interface ScreenHeader {
    text: string;
    withBackButton?: boolean;
    onBackPress?: any;
    optionalComponent?: ReactNode;
    containerStyle?: ViewStyle;
}
export const ScreenHeader: FC<ScreenHeader> = memo(({ text, onBackPress, withBackButton, optionalComponent, containerStyle }) => {
    return (
        <View style={[styles.header, containerStyle]}>
            {withBackButton && (
                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={onBackPress}
                    activeOpacity={StyleEnum.TOUCHABLE_OPACITY}>
                    <BackIcon />
                </TouchableOpacity>
            )}
            <Text style={[styles.headerText,]} >{text}</Text>
            <View style={styles.optionalComponentWrapper}>
                {optionalComponent}
            </View>
        </View>
    );
});
