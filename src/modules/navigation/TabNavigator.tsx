import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';
import React from 'react';
import {tabRoutes} from '../../navigation/routes';

import {SchedulePlus} from '../../screens/SheduleScreen/components/SchedulePlus';
import {SheduleHeader} from '../../screens/SheduleScreen/components/SheduleHeader';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 80,
            paddingHorizontal: 20,
          },
          header: ({route, options}) => {
            const title = getHeaderTitle(options, route.name);
            return <SheduleHeader text={title} />;
          },
          tabBarActiveTintColor: '#171930',
          tabBarInactiveTintColor: '#BAC2CB',
          tabBarItemStyle: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 8,
            paddingVertical: 16,
          },
        }}>
        {tabRoutes.map(route => (
          <Tab.Screen
            name={route.name}
            key={route.name}
            options={route.options}
            component={route.component}
          />
        ))}
      </Tab.Navigator>
      <SchedulePlus />
    </>
  );
};
