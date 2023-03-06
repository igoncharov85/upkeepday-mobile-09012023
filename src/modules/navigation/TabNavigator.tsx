import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, View} from 'react-native';
import {NavigationEnum} from '../../common/constants/navigation';
import {ScheduleScreen} from '../../screens/SheduleScreen';

const Tab = createBottomTabNavigator();

const Mock = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>In progress...</Text>
    </View>
  );
};
const TabNavigator = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name={NavigationEnum.SCHEDULE_TAB}
        component={ScheduleScreen}
      />
      <Tab.Screen name={NavigationEnum.TO_DO_TAB} component={ScheduleScreen} />
      <Tab.Screen
        name={NavigationEnum.CLASSES_TAB}
        component={ScheduleScreen}
      />
      <Tab.Screen
        name={NavigationEnum.STUDENTS_TAB}
        component={ScheduleScreen}
      />
    </Tab.Navigator>
  );
};
