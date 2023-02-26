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
import styles from './styles';

interface ICustomInputProps extends TextInputProps {
  labelText?: string;
  isPassword?: boolean;
  validationErrorText?: string;
  touched: boolean;
}
export const CustomInput: FC<ICustomInputProps> = memo(
  ({
    labelText = '',
    isPassword = false,
    validationErrorText = '',
    touched,
    secureTextEntry,
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
            <EyeSvg />
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
            {...props}
            secureTextEntry={isVisible}
            style={styles.input}
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
