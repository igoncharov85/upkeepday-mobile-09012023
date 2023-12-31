import React, { FC, memo } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from 'react-native';
import { ColorEnum } from '../../../common/constants/styles/colors.enum';
import { StyleEnum } from '../../../common/constants/styles/styles.enum';
import styles from './styles';

interface ICustomButton extends TouchableOpacityProps {
  text: string;
  loading?: boolean;
  type?: TypeButton;
  height?: number;
  width?: number;
  style?: {};
  errorColor?: boolean;
  backgroundColor?: string;
}
export enum TypeButton {
  solid,
  opacity,
}
export const CustomButton: FC<ICustomButton> = memo(
  ({
    text,
    type,
    disabled,
    onPress,
    loading = false,
    height,
    width,
    style,
    errorColor,
    backgroundColor,
    ...props
  }: ICustomButton) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={
          disabled ? StyleEnum.TOUCHABLE_DISABLE : StyleEnum.TOUCHABLE_OPACITY
        }
        style={[
          styles.container,
          type == TypeButton.opacity && styles.containerActive,
          {
            opacity: disabled ? StyleEnum.TOUCHABLE_DISABLE : 1,
            backgroundColor: errorColor ? 'red' : backgroundColor ? backgroundColor : '#9A80BA'
          },
          { ...style },
        ]}
        onPress={onPress}
        {...props}>
        {loading ? (
          <ActivityIndicator color={ColorEnum.ACCENT_BC} size={'small'} />
        ) : (
          <Text
            style={[
              styles.text,
              type == TypeButton.opacity && styles.textActive,
            ]}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);
