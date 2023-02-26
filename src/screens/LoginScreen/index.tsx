import React, {memo} from 'react';
import {Text, View} from 'react-native';
import CalendarSvg from '../../../assets/svg/CalendarSvg';
import styles from './styles';

export const LoginScreen = memo(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <CalendarSvg />
    </View>
  );
});
