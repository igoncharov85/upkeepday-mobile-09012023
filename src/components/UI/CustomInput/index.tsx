import React, {FC, memo, useState} from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckMarkOrange from '../../../../assets/svg/CheckMarkOrange';
import EyeSvg from '../../../../assets/svg/EyeSvg';
import EyeSvgOpen from '../../../../assets/svg/EyeSvgOpen';
import styles from './styles';

export interface ICustomInputProps extends TextInputProps {
  labelText?: string;
  isPassword?: boolean;
  validationErrorText?: string;
  touched?: boolean;
  disabled?: boolean;
  style?: {};
}

export const CustomInput: FC<ICustomInputProps> = memo(
  ({
    labelText = '',
    isPassword = false,
    validationErrorText = '',
    touched,
    secureTextEntry,
    disabled,
    style,
    ...props
  }) => {
    const [isVisible, setIsVisible] = useState<boolean>(!!secureTextEntry);
    const switchVisible = () => {
      setIsVisible(!isVisible);
    };
    const renderAppropriateIcon = () => {
      if (isPassword) {
        return isVisible ? (
          <TouchableOpacity onPress={switchVisible}>
            <EyeSvg />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={switchVisible}>
            <EyeSvgOpen />
          </TouchableOpacity>
        );
      }
      if (!validationErrorText && touched) {
        return <CheckMarkOrange />;
      }
      return <></>;
    };
    return (
      <>
        <Text style={styles.labelText}>{labelText}</Text>
        <View style={styles.container}>
          <TextInput
            autoCapitalize="none"
            {...props}
            secureTextEntry={isVisible}
            style={{
              ...styles.input,
              backgroundColor: disabled ? '#E5E8EB' : 'white',
              ...style,
            }}
            placeholderTextColor={'grey'}
            editable={disabled}
            selectTextOnFocus={true}
            blurOnSubmit={false}
          />

          <View style={styles.absoluteIcon}>{renderAppropriateIcon()}</View>
        </View>
        {validationErrorText && touched && (
          <Text style={styles.errorText}>{validationErrorText}</Text>
        )}
      </>
    );
  },
);
