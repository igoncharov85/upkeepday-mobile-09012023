import React, {FC, memo} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ColorEnum} from '../../../common/constants/styles/colors.enum';
import {StyleEnum} from '../../../common/constants/styles/styles.enum';
import styles from './styles';

interface ICustomButton extends TouchableOpacityProps {
  text: string;
  loading?: boolean;
}
export const CustomButton: FC<ICustomButton> = memo(
  ({text, disabled, onPress, loading = false, ...props}: ICustomButton) => {
    return (
      <TouchableOpacity
        activeOpacity={
          disabled ? StyleEnum.TOUCHABLE_DISABLE : StyleEnum.TOUCHABLE_OPACITY
        }
        style={{
          ...styles.container,
          opacity: disabled ? StyleEnum.TOUCHABLE_DISABLE : 1,
        }}
        onPress={onPress}
        {...props}>
        {loading ? (
          <ActivityIndicator color={ColorEnum.ACCENT_BC} size={'small'} />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </TouchableOpacity>
    );
  },
);
