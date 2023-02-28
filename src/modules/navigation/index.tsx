import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './StackNavigator';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {ColorEnum} from '../../common/constants/styles/colors.enum';
import {NavigationEnum} from '../../common/constants/navigation';

const linking = {
  prefixes: ['classplan://'],
  config: {
    screens: {
      [NavigationEnum.REGISTRATION]: 'verif/:uuid',
    },
  },
};
export const RootNavigation = memo(() => {
  return (
    <NavigationContainer
      //@ts-ignore
      linking={linking}
      fallback={
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          color={ColorEnum.BUTTON_ACCENT}
          size="large"
        />
      }>
      <StackNavigator />
    </NavigationContainer>
  );
});
