
import React, {memo, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationEnum} from '../../common/constants/navigation';
import {LoginScreen} from '../../screens/LoginScreen';
import {RegistrationScreen} from '../../screens/RegistrationScreen';
import {FinalRegistrationScreen} from '../../screens/RegistrationScreen/FinalRegistrtionScreen';
import {SendEmailScreen} from '../../screens/ForgotPassScreen/SendEmailScreen';
import {SetPasswordScreen} from '../../screens/ForgotPassScreen/SetPasswordScreen';
import { ScheduleScreen } from '../../screens/SheduleScreen';
import { ScheduleMonthScreen } from '../../screens/SheduleScreen/ScheduleMonthScreen';
import { ScheduleDayScreen } from '../../screens/SheduleScreen/SheduleDayScreen';
import { SheduleWeekScreen } from '../../screens/SheduleScreen/SheduleWeekScreen';
import { CancellationScreen } from '../../screens/CancellationScreen';
import { CancellationModal } from '../../screens/SheduleScreen/components/CancellationModal';
import { AddClassScreen } from '../../screens/AddClassScreen';
import { SelectDateScreen } from '../../screens/SelectDateScreen';
import { AsyncStorageService } from '../../services/async-storage';
import { useAppSelector } from '../../store/hooks';


const Stack = createNativeStackNavigator();
export const StackNavigator = memo(() => {
  const {isAuth} = useAppSelector((store) => store.auth)
  useEffect(()=> {
    
  }, [])
  return (

    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={isAuth ? NavigationEnum.HOME_SCREEN : NavigationEnum.LOGIN}>
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
      <Stack.Screen
        name={NavigationEnum.SHEDULE_DAY}
        component={ScheduleDayScreen}
      />
      <Stack.Screen
        name={NavigationEnum.SHEDULE_WEEK}
        component={SheduleWeekScreen}
      />
      <Stack.Screen
        name={NavigationEnum.SHEDULE_MONTH}
        component={ScheduleMonthScreen}
      />

      <Stack.Screen
        name={NavigationEnum.HOME_SCREEN}
        component={ScheduleScreen}
      />
      <Stack.Screen
        name={NavigationEnum.CANCELLATION_MODAL}
        component={CancellationModal}
      />
      <Stack.Screen
        name={NavigationEnum.CANCELLATION_SCREEN}
        component={CancellationScreen}
      />
      <Stack.Screen
        name={NavigationEnum.ADD_CLASS_SCREEN}
        component={AddClassScreen}
      />
      <Stack.Screen
        name={NavigationEnum.SELECT_DATE_SCREEN}
        component={SelectDateScreen}
      />
    </Stack.Navigator>
  );
});
