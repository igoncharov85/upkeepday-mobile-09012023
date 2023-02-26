import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationEnum} from '../../common/constants/navigation';
import {LoginScreen} from '../../screens/LoginScreen';
import {RegistrationScreen} from '../../screens/RegistrationScreen';
import {ForgotPassword} from '../../screens/ForgotPassScreen';

const Stack = createNativeStackNavigator();
export const StackNavigator = memo(() => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={NavigationEnum.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={NavigationEnum.REGISTRATION}
        component={RegistrationScreen}
      />
      <Stack.Screen
        name={NavigationEnum.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
});
