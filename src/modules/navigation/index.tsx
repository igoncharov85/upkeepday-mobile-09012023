import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './StackNavigator';
export const RootNavigation = memo(() => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
});
