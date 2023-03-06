import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationEnum} from '../../common/constants/navigation';
import {LoginScreen} from '../../screens/LoginScreen';
import {RegistrationScreen} from '../../screens/RegistrationScreen';
import {FinalRegistrationScreen} from '../../screens/RegistrationScreen/FinalRegistrtionScreen';
import {SendEmailScreen} from '../../screens/ForgotPassScreen/SendEmailScreen';
import {SetPasswordScreen} from '../../screens/ForgotPassScreen/SetPasswordScreen';
import { ScheduleScreen } from '../../screens/SheduleScreen';

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
        name={NavigationEnum.FORGOT_PASSWORD_SEND_EMAIL}
        //@ts-ignore
        component={SendEmailScreen}
      />
      <Stack.Screen
        name={NavigationEnum.FORGOT_PASSWORD_SEND_PASSWORD}
        //@ts-ignore
        component={SetPasswordScreen}
      />
      <Stack.Screen
        name={NavigationEnum.REGISTRATION_FINAL}
        component={FinalRegistrationScreen}
      />
      <Stack.Screen name={NavigationEnum.HOME_SCREEN} component={ScheduleScreen} />
    </Stack.Navigator>
  );
});
