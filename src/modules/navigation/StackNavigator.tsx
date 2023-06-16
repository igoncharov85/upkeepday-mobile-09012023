
import React, { memo, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationEnum } from '../../common/constants/navigation';
import { LoginScreen } from '../../screens/LoginScreen';
import { RegistrationScreen } from '../../screens/RegistrationScreen';
import { FinalRegistrationScreen } from '../../screens/RegistrationScreen/FinalRegistrtionScreen';
import { SendEmailScreen } from '../../screens/ForgotPassScreen/SendEmailScreen';
import { SetPasswordScreen } from '../../screens/ForgotPassScreen/SetPasswordScreen';
import { ScheduleMonthScreen } from '../../screens/SheduleScreen/ScheduleMonthScreen';
import { ScheduleDayScreen } from '../../screens/SheduleScreen/SheduleDayScreen';
import { SheduleWeekScreen } from '../../screens/SheduleScreen/SheduleWeekScreen';
import { CancellationScreen } from '../../screens/CancellationScreen';
import { AddClassScreen } from '../../screens/AddClassScreen';
import { SelectDateScreen } from '../../screens/SelectDateScreen';
import { useAppSelector } from '../../store/hooks';
import { DateRecurrenceScreen } from '../../screens/DateRecurrenceScreen';
import { DatePreviewScreen } from '../../screens/DatePreviewScreen';
import { AddStudentsScreen } from '../../screens/AddStudentsScreen';
import { PrepaymentConfigurationScreen } from '../../screens/PrepaymentConfigurationScreen';
import { TabNavigator } from './TabNavigator';
import { ClassesScreen } from '../../screens/ClassesScreen';
import { EditClassScreen } from '../../screens/EditClassScreen';


const Stack = createNativeStackNavigator();
export const StackNavigator = memo(() => {
  const { isAuth } = useAppSelector((store) => store.auth)
  useEffect(() => {

  }, [])
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuth ? NavigationEnum.HOME_SCREEN : NavigationEnum.LOGIN}>
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
        component={TabNavigator}
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
      <Stack.Screen
        name={NavigationEnum.DATE_RECURRENCE_SCREEN}
        component={DateRecurrenceScreen}
      />
      <Stack.Screen
        name={NavigationEnum.DATE_PREVIEW_SCREEN}
        component={DatePreviewScreen}
      />
      <Stack.Screen
        name={NavigationEnum.ADD_STUDENTS_SCREEN}
        component={AddStudentsScreen}
      />
      <Stack.Screen
        name={NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN}
        component={PrepaymentConfigurationScreen}
      />
      <Stack.Screen
        name={NavigationEnum.CLASS_SCREEN}
        component={ClassesScreen}
      />
      <Stack.Screen
        name={NavigationEnum.EDIT_CLASS_SCREEN}
        component={EditClassScreen}
      />
    </Stack.Navigator>
  );
});
