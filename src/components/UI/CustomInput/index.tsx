import React, {FC, memo} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TextInputProps} from 'react-native';
import CheckMarkOrange from '../../../../assets/svg/CheckMarkOrange';
import styles from './styles';

interface ICustomInputProps extends TextInputProps {
  labelText: string;
  isPassword: boolean;
  validationErrorText: string;
}
export const CustomInput: FC<ICustomInputProps> = memo(
  ({labelText, isPassword, ...props}) => {
    const renderAppropriateIcon = () => {
        if(isPassword){
            <CheckMarkOrange />
        }
        if()
    }
    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>{labelText}</Text>
        <TextInput {...props} />
        <View style={styles.absoluteIcon}>
          {isPassword &&}
          {isPassword && <CheckMarkOrange />}
        </View>
      </View>
    );
  },
);
