import React, { FC, ReactNode, memo } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { ColorEnum } from '../../../common/constants/styles/colors.enum';
import { StyleEnum } from '../../../common/constants/styles/styles.enum';
import styles from './styles';

interface ICustomButton extends TouchableOpacityProps {
    text: string;
    loading?: boolean;
    type?: TypeButton;
    height?: number;
    width?: number;
    icon?: ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

export enum TypeButton {
    solid,
    opacity,
};

export const CustomButton: FC<ICustomButton> = memo(({ text, type, disabled, onPress, loading = false, height, width, icon, style, textStyle, ...props }: ICustomButton) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={disabled ? StyleEnum.TOUCHABLE_DISABLE : StyleEnum.TOUCHABLE_OPACITY}
            style={[styles.container, type == TypeButton.opacity && styles.containerActive, style]}
            onPress={onPress}
            {...props}
        >
            {loading
                ? <ActivityIndicator color={ColorEnum.ACCENT_BC} size={'small'} />
                : <Text style={[styles.text, type == TypeButton.opacity && styles.textActive, textStyle]}>{text}</Text>
            }
            {icon}
        </TouchableOpacity>
    );
});
