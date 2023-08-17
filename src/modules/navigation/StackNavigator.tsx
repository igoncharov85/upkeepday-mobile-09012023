import React, { memo, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationEnum } from '../../common/constants/navigation';
import { routes } from '../../navigation/routes'
import { useAppSelector } from '../../store/hooks';

const Stack = createNativeStackNavigator();
export const StackNavigator = memo(() => {

  const { isAuth } = useAppSelector((store) => store.auth)
  useEffect(() => {

  }, [])
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuth ? NavigationEnum.HOME_SCREEN : NavigationEnum.LOGIN}>
      {routes.map(route => (
        <Stack.Screen
          name={route.name}
          key={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
  );
});
